/* Core */
import { put, takeEvery, call, all } from "redux-saga/effects";
import jwt from "jwt-decode";
/* Types */
import { types } from "./types";
/* Actions */
import { authActions } from "./actions";
/* Services */
import sessionService from "../../services/sessionService";
/* Api */
import { getServerPublicKey, pwlLogin } from "../../api/auth";

function* prepareSession(action) {
  try {
    if (!sessionService.sessionKeysAreReady()) {
      const {
        data: { publicKey },
      } = yield call(getServerPublicKey);
      yield call(sessionService.setServerPublicKey, publicKey);
      yield call(sessionService.setCommunityKeys);
    }
    const authenticated = yield call(sessionService.getToken);
    yield put(
      authActions.prepareSessionSuccess({
        authenticated: authenticated !== null && authenticated !== undefined,
      })
    );
  } catch (error) {
    const errorMessage =
      error?.message === "Request failed with status code 500"
        ? "Our servers are down. Please try logging in again later"
        : error?.response?.data?.message;
    if (errorMessage) {
      yield put(
        authActions.showMessage({
          message: {
            show: true,
            text: errorMessage,
            severity: "error",
          },
        })
      );
    }
    yield put(authActions.prepareSessionFailure(error));
  }
}

function* pwlLoginUser(action) {
  const { data, successCallBack, errorCallback } = action.payload;
  try {
    const userInfo = yield call(pwlLogin, data.sessionId);
    const { jwt_token } = userInfo.data.data;
    let tokenInfo =
      jwt_token !== null && jwt_token !== undefined ? jwt(jwt_token) : null;
    if (tokenInfo) {
      yield sessionService.setSessionToken(jwt_token);
      yield put(authActions.pwlLoginSuccess());
      yield call(successCallBack);
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    console.log("errorMessage", errorMessage);
    if (
      (errorMessage &&
        error?.response?.data?.code === 404 &&
        errorMessage === "User not Found") ||
      error?.response?.data?.code === 401
    ) {
      yield put(
        authActions.showMessage({
          message: {
            show: true,
            text: "You are not authorized to access this page",
            severity: "error",
          },
        })
      );
      errorCallback();
    }
    yield put(authActions.pwlLoginFailure(error));
  }
}

function* logoutUser(action) {
  try {
    const { message, redirectToLogin, isForceLogout } = action.payload;
    yield call(sessionService.clearSession);
    if (message) {
      yield put(
        authActions.showMessage({
          message,
        })
      );
    }
    yield put(authActions.logoutSuccess({ redirectToLogin, isForceLogout }));
  } catch (error) {
    console.error({ error });
  }
}

export function* authSaga() {
  yield all([
    takeEvery(types.PREPARE_SESSION_REQUEST, prepareSession),
    takeEvery(types.PWL_LOGIN_REQUEST, pwlLoginUser),
    takeEvery(types.LOGOUT, logoutUser),
  ]);
}

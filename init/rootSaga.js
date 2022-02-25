/* Core */
import { all, fork } from "redux-saga/effects";

/* Sagas */
import { authSaga } from "../components/Auth/saga";

export function* rootSaga() {
  yield all([fork(authSaga)]);
}

/* Core */
import { createReducer } from "reduxsauce";
/* Types */
import { types } from "./types";

export const INITIAL_STATE = {
  loading: false,
  loadingSession: false,
  sessionIsReady: false,
  sessionError: null,
  loginError: null,
  message: null,
  redirectToLogin: false,
  isForceLogout: false,
  authenticated: false,
};

export const pwlLoginRequest = (state = INITIAL_STATE) => {
  return { ...state, loading: true, message: null };
};

export const pwlLoginSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    loginError: false,
    loading: false,
    redirectToLogin: false,
    authenticated: true,
  };
};

export const pwlLoginFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loginError: action.payload,
    loading: false,
  };
};

export const prepareSessionRequest = (state = INITIAL_STATE) => {
  return { ...state, loadingSession: true };
};

export const prepareSessionSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    sessionError: false,
    sessionIsReady: true,
    loadingSession: false,
    authenticated: action.payload.authenticated,
  };
};

export const prepareSessionFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    sessionError: action.payload,
    sessionIsReady: true,
    loadingSession: false,
  };
};

export const logoutSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    sessionIsReady: false,
    redirectToLogin: action.payload.redirectToLogin,
    isForceLogout: action.payload.isForceLogout,
    authenticated: false,
  };
};

export const showMessage = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    message: action.payload.message,
  };
};

export const clearMessage = (state = INITIAL_STATE) => {
  return {
    ...state,
    message: null,
  };
};

export const HANDLERS = {
  [types.PREPARE_SESSION_REQUEST]: prepareSessionRequest,
  [types.PREPARE_SESSION_SUCCESS]: prepareSessionSuccess,
  [types.PREPARE_SESSION_FAILURE]: prepareSessionFailure,
  [types.PWL_LOGIN_SUCCESS]: pwlLoginSuccess,
  [types.PWL_LOGIN_FAILURE]: pwlLoginFailure,
  [types.PWL_LOGIN_FAILURE]: pwlLoginFailure,
  [types.LOGOUT_SUCCESS]: logoutSuccess,
  [types.SHOW_MESSAGE]: showMessage,
  [types.CLEAR_MESSAGE]: clearMessage,
};

export const authReducer = createReducer(INITIAL_STATE, HANDLERS);

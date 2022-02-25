/* Core */
import { createActions } from "reduxsauce";

export const { Creators: authActions } = createActions(
  {
    prepareSessionRequest: ["payload"],
    prepareSessionSuccess: ["payload"],
    prepareSessionFailure: ["payload"],
    pwlLoginRequest: ["payload"],
    pwlLoginSuccess: ["payload"],
    pwlLoginFailure: ["payload"],
    logout: ["payload"],
    logoutSuccess: ["payload"],
    showMessage: ["payload"],
    clearMessage: [],
  },
  { prefix: "auth-" }
);

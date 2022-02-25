/* Core */
import { createTypes } from "reduxsauce";

export const types = createTypes(
  `
  PREPARE_SESSION_REQUEST
  PREPARE_SESSION_SUCCESS
  PREPARE_SESSION_FAILURE
  PWL_LOGIN_SUCCESS
  PWL_LOGIN_FAILURE
  PWL_LOGIN_REQUEST
  LOGOUT
  LOGOUT_SUCCESS
  SHOW_MESSAGE
  CLEAR_MESSAGE
`,
  { prefix: "auth-" }
);

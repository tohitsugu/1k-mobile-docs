/* Core */
import { combineReducers } from "redux";

/* Reducers */
import { authReducer } from "../components/Auth/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
});

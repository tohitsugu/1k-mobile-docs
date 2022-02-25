/* Core */
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";
/* Actions */
import { authActions } from "../actions";
/* Services */
import sessionService from "../../../services/sessionService";
/* Navigation */
import { links } from "../../../navigation/config";

export const useAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const token = sessionService.getToken();
  let tokeInfo = token !== null && token !== undefined ? jwt(token) : {};
  const { sessionIsReady, loadingSession, message } = useSelector(
    (state) => state.auth
  );

  const redirectToDashboard = () => {
    history.push(links.dashboard);
  };

  const handleLogout = () => {
    dispatch(
      authActions.logout({
        message: {
          show: true,
          text: "You have been logged out successfully",
          severity: "success",
        },
        redirectToLogin: true,
      })
    );
  };

  return {
    sessionIsReady,
    authenticated: !!token,
    handleLogout,
    loadingSession,
    redirectToDashboard,
    tokeInfo,
    message,
  };
};

import { useCallback } from "react";
import { useDispatch } from "react-redux";
/* Actions */
import { authActions } from "../../components/Auth/actions";

export const useShowMessage = () => {
  const dispatch = useDispatch();
  const showMessage = useCallback(
    (message, severity, error) => {
      if (
        !error ||
        (error && error?.response && error?.response?.status !== 401)
      ) {
        dispatch(
          authActions.showMessage({
            message: {
              show: true,
              text: message,
              severity: severity,
            },
          })
        );
      }
    },
    [dispatch]
  );

  return { showMessage };
};

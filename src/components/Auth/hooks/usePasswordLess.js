/* Core */
import { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
/* Actions */
import { authActions } from "../actions";
/* API */
import { createNewSession } from "../../../api/auth";
/* Hooks */
import { useMountedState } from "../../../shared/hooks/useMountedState";
import { useInterval } from "../../../shared/hooks/useInterval";
import { useShowMessage } from "../../../shared/hooks/useShowMessage";

export const usePasswordLess = ({
  authenticated,
  loadingSession,
  sessionIsReady,
}) => {
  const [session, setSession] = useState(false);
  const [QRValue, setQRValue] = useState(null);
  const sessionTimeId = useRef(null);
  const pushSessionTimeId = useRef(null);
  const isMounted = useMountedState();
  const dispatch = useDispatch();
  const { showMessage } = useShowMessage();

  const createSessionParams = useMemo(
    () => ({
      scopes: "firstname,lastname,ial,aal,device_info,location",
      authType: "Fingerprint",
    }),
    []
  );

  const errorCallback = () => {
    if (isMounted()) {
      setSession(null);
      setQRValue(null);
      if (pushSessionTimeId.current) {
        clearTimeout(pushSessionTimeId.current);
      }
      if (sessionTimeId.current) {
        clearTimeout(sessionTimeId.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (pushSessionTimeId.current) {
        clearTimeout(pushSessionTimeId.current);
      }
      if (sessionTimeId.current) {
        clearTimeout(sessionTimeId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (
      isMounted() &&
      !session &&
      !authenticated &&
      sessionIsReady &&
      !loadingSession
    ) {
      createNewSession(createSessionParams)
        .then((res) => {
          const {
            data: { data },
          } = res;
          if (isMounted()) {
            console.log("session create data : ", { data });
            setSession(data);
            setQRValue(data.sessionUrl);
            if (sessionTimeId.current) {
              clearTimeout(sessionTimeId.current);
            }
            const timeId = setTimeout(() => {
              if (isMounted) {
                setSession(null);
              }
            }, 60000);
            sessionTimeId.current = timeId;
          }
        })
        .catch((error) => {
          const errorMessage = error?.response?.data?.message;
          if (errorMessage && error?.response?.data?.code !== 401) {
            showMessage(errorMessage, "error", error);
          }
        });
    }
  }, [
    session,
    isMounted,
    showMessage,
    authenticated,
    createSessionParams,
    sessionIsReady,
    loadingSession,
  ]);

  useInterval(() => {
    if (session && !authenticated) {
      dispatch(
        authActions.pwlLoginRequest({
          data: {
            sessionId: session.sessionId,
          },
          errorCallback,
        })
      );
    }
  }, 500);

  return {
    QRValue,
  };
};

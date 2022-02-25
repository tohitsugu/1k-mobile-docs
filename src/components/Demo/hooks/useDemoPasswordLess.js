/* Core */
import { useState, useEffect, useMemo, useRef } from "react";
/* API */
import { createNewSession, pwlLoginDemo } from "../../../api/auth";
/* Hooks */
import { useMountedState } from "../../../shared/hooks/useMountedState";
import { useInterval } from "../../../shared/hooks/useInterval";
import { useShowMessage } from "../../../shared/hooks/useShowMessage";

export const useDemoPasswordLess = ({ loadingSession, sessionIsReady }) => {
  const [session, setSession] = useState(false);
  const [timer, setTimer] = useState(120);
  const [startSession, setStartSession] = useState(false);
  const [userData, setUserData] = useState(false);
  const [scope, setScope] = useState("");
  const [debugList, setDebugList] = useState([]);

  const sessionTimeId = useRef(null);
  const isMounted = useMountedState();
  const { showMessage } = useShowMessage();

  const createSessionParams = useMemo(
    () => ({
      scopes:
        (scope && scope.replace(/ /g, "")) ||
        "firstname,lastname,ial,aal,device_info,location",
      authType: "Fingerprint",
    }),
    [scope]
  );

  const errorCallback = () => {
    if (isMounted()) {
      setSession(null);
      setTimer(120);
      if (sessionTimeId.current) {
        clearTimeout(sessionTimeId.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (sessionTimeId.current) {
        clearTimeout(sessionTimeId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (
      isMounted() &&
      !session &&
      sessionIsReady &&
      !loadingSession &&
      startSession
    ) {
      createNewSession(createSessionParams)
        .then((res) => {
          const {
            data: { data },
          } = res;
          if (isMounted()) {
            setSession(data);
            if (sessionTimeId.current) {
              clearTimeout(sessionTimeId.current);
            }
            const timeId = setTimeout(() => {
              if (isMounted) {
                setStartSession(false);
              }
            }, 120000);
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
    createSessionParams,
    sessionIsReady,
    loadingSession,
  ]);

  useInterval(() => {
    if (session && !userData) {
      pwlLoginDemo(session.sessionId)
        .then((res) => {
          const {
            data: { data },
          } = res;
          if (isMounted()) {
            if (
              data &&
              (data?.status === 404 || data?.status === 400) &&
              (data?.message === `Session with this sessionId doesn't exist` ||
                data?.message === "Session has expired")
            ) {
              setDebugList((prevDebugList) => [data, ...prevDebugList]);
            } else if (data && data?.status === 200 && !data.message) {
              setUserData(data);
              setStartSession(false);
              setTimer(0);
            } else {
              setDebugList((prevDebugList) => [data, ...prevDebugList]);
            }
          }
        })
        .catch((error) => {
          const errorMessage = error?.response?.data?.message;
          console.log("errorMessage", errorMessage);
          setDebugList((prevDebugList) => [data, ...prevDebugList]);
          errorCallback();
        });
    }
  }, 1000);

  useEffect(() => {
    if (session) {
      let myInterval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        }
        if (timer === 0) {
          setTimer(0);
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  }, [session, timer]);

  const handleStartSession = () => {
    setStartSession(true);
    setSession(null);
    setTimer(120);
    setUserData(null);
    setDebugList([]);
  };

  const handleScopeChange = (event) => {
    setScope(event.target.value);
  };

  return {
    QRValue: session?.sessionUrl,
    handleStartSession,
    sessionValue: session,
    startSession,
    userData,
    scope,
    handleScopeChange,
    debugList,
    timer,
  };
};

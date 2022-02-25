import { useEffect, useRef } from "react";
/* Hooks */
import { useMountedState } from "./useMountedState";

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  const isMounted = useMountedState();

  useEffect(() => {
    if (isMounted()) {
      savedCallback.current = callback;
    }
  }, [callback, isMounted]);

  useEffect(() => {
    if (isMounted()) {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }
  }, [callback, delay, isMounted]);
  return { delay };
};

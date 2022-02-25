/* Core */
import { useCallback } from "react";
/* Hooks */
import { useMountedState } from "./useMountedState";

export const useSafeAsync = () => {
  const isMounted = useMountedState();
  const safeAsync = useCallback((promise) => {
    return new Promise((resolve) => {
      promise.then((value) => {
        if (isMounted()) {
          resolve(value);
        }
      });
    });
  }, []); //eslint-disable-line

  return safeAsync;
};

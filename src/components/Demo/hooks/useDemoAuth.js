/* Core */
import { useSelector } from "react-redux";

export const useDemoAuth = () => {
  const { sessionIsReady, loadingSession } = useSelector((state) => state.auth);

  return {
    sessionIsReady,
    loadingSession,
  };
};

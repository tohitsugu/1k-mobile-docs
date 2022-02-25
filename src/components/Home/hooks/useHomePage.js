/* Core */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
/* Hooks */
import { useMountedState } from "../../../shared/hooks/useMountedState";
/* Navigation */
import { links } from "../../../navigation/config";

export const useHomePage = () => {
  const { push } = useHistory();
  const isMounted = useMountedState();
  const [loading, setLoading] = useState(true);

  const handleRegister = () => {
    push(`${links.register}`);
  };

  const handleRequestInvite = () => {
    push(`${links.requestAnInvite}`);
  };

  useEffect(() => {
    if (isMounted()) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  });
  return {
    handleRegister,
    handleRequestInvite,
    loading,
  };
};

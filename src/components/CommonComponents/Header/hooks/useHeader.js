/* Core */
import { useHistory } from "react-router-dom";
/* Navigation */
import { links } from "../../../../navigation/config";

export const useHeader = () => {
  const { push } = useHistory();
  const handleSignIn = () => {
    push(`${links.login}`);
  };

  const handleRegister = () => {
    push(`${links.register}`);
  };

  return {
    handleSignIn,
    handleRegister,
  };
};

/* Core */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
/* Hooks */
import { useSession } from "../../components/CommonComponents/Header/hooks/useSessions";
import { useAuth } from "../../components/Auth/hooks/useAuth";
/* Navigation */
import { links } from "../../navigation/config";

export const useLayout = () => {
  const { pathname } = useLocation();
  const { sessionIsReady } = useSession();
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const [isSmallScreenDrawerOpen, setSmallScreenDrawerOpen] = useState(false);
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isLogin =
    pathname === `${links.login}` || pathname === `${links.login}/`;
  const isHome = pathname === `${links.root}`;
  const isRegister =
    pathname === `${links.register}` || pathname === `${links.register}/`;

  const isRequestInvite =
    pathname === `${links.requestAnInvite}` ||
    pathname === `${links.requestAnInvite}/`;
  const { authenticated } = useAuth();
  const toggleDrawer = () => {
    setDrawerOpen((open) => !open);
  };
  const toggleSmallScreenDrawer = () => {
    setSmallScreenDrawerOpen((open) => !open);
  };
  const showSidebar =
    !isHome && !isLogin && !isRegister && !isRequestInvite && sessionIsReady;
  const withDrawer =
    isDrawerOpen && showSidebar && sessionIsReady && largeScreen;
  const withSidebar =
    showSidebar && sessionIsReady && !isDrawerOpen && largeScreen;

  const fullWidth = pathname === `${links.users}`;

  return {
    toggleDrawer,
    toggleSmallScreenDrawer,
    withDrawer,
    withSidebar,
    fullWidth,
    isSmallScreenDrawerOpen,
    isLogin,
    showSidebar,
    isDrawerOpen,
    setDrawerOpen,
    largeScreen,
    sessionIsReady,
    authenticated,
  };
};

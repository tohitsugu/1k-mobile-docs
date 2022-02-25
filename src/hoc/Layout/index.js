/* Core */
import React, { memo } from "react";
import cx from "classnames";
import { Provider } from "react-redux";
import { create } from "jss";
import { makeStyles, Box } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Hidden from "@material-ui/core/Hidden";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createWrapper } from "next-redux-wrapper";
import PropTypes from "prop-types";
import Head from "@docusaurus/Head";
/* Components */
import Header from "../../components/CommonComponents/Header/Header";
import { Footer } from "../../components/CommonComponents/Footer/Footer";
import SidebarHome from "../../components/CommonComponents/Sidebar/SidebarHome";
import { Sidebar } from "../../components/CommonComponents/Sidebar/Sidebar";
import { SmallScreenDrawer } from "../../components/CommonComponents/Sidebar/SmallScreenDrawer";
import AppError from "../../components/CommonComponents/AppError";
import { AppLoading } from "../../components/CommonComponents/AppLoading";
/* Hooks */
import { useLayout } from "../../shared/hooks/useLayout";
/* Icons */
import { MenuIcon } from "../../icons/MenuIcon";
/* Styles */
import useTheme from "../../styles/useTheme";
import GlobalCss from "../../styles/globalCSS";
/* Store */
import { store } from "../../init/store";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    backgroundColor: "#f2f2fd",
    height: "100%",
    width: "100%",
    bottom: 76,
  },
  pageContainerAuth: { backgroundColor: "#fff !important" },
  main: {
    marginLeft: (props) =>
      props.isRegister || props.isLogin ? "0px" : "264px",
    position: "relative",
    flexGrow: 1,
    overflowX: "hidden",
    paddingTop: 72,
    padding: "0 5% 0 5%",
    backgroundColor: "#f2f2fd",
    [theme.breakpoints.down("md")]: {
      marginLeft: (props) =>
        props.isRegister || props.isLogin ? "0px" : "auto",
    },
  },
  withDrawer: {
    marginLeft: theme.drawerWidth,
    height: "100%",
  },
  fullWidth: {
    maxWidth: "100% !important",
  },
  withSidebar: {
    marginLeft: 60,
    marginTop: theme.headerHeight,
  },
  menuIcon: {
    position: "fixed",
    bottom: 10,
    left: 0,
    width: 50,
    height: 50,
    borderRadius: "50%",
    padding: "13px 15px 13px 12px",
    display: "block",
    zIndex: 10000,
  },
  container_login_sso: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "100% !important",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "100% !important",
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: "100% !important",
    },
  },
}));

const jss = create({
  plugins: [...jssPreset().plugins],
});

const RenderScriptInHead = () => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="stylesheet" href="https://use.typekit.net/tus5fxi.css" />
      <title>1Kosmos Developer Experience</title>
      <link
        rel="icon"
        type="image/png"
        href={`${window?.location?.protocol}//${window?.location?.host}/devportal/img/favicon-32x32.png`}
        sizes="16x16"
      />
    </Head>
  );
};

const Layout = (props) => {
  const theme = useTheme();
  const classes = useStyles(props);
  const {
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
  } = useLayout();

  return (
    <AppError>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalCss />
          <Provider store={store}>
            <Box
              position="relative"
              height="100vh"
              className={isLogin ? classes.overlay : ""}
            >
              {!props.isDemo && <Header {...props} />}
              {!props.isLogin && !authenticated && !props.isDemo && (
                <SidebarHome />
              )}
              <Box display="flex" height="100%">
                {showSidebar && !props.isDemo && (
                  <Sidebar
                    toggleDrawer={toggleDrawer}
                    isDrawerOpen={isDrawerOpen && largeScreen}
                    setDrawerOpen={setDrawerOpen}
                  />
                )}
                <Box
                  component="main"
                  className={cx(classes.main, {
                    [classes.withDrawer]: withDrawer,
                    [classes.withSidebar]: withSidebar,
                    [classes.pageContainerAuth]: authenticated,
                  })}
                >
                  {!sessionIsReady ? (
                    <AppLoading />
                  ) : (
                    <Container
                      maxWidth={false}
                      className={cx({
                        withDrawer: showSidebar,
                        [classes.fullWidth]: fullWidth,
                        [classes.container_login_sso]: isLogin,
                      })}
                      disableGutters
                    >
                      <Box
                        className={`${classes.pageContainer} ${
                          authenticated && classes.pageContainerAuth
                        }`}
                      >
                        {RenderScriptInHead()}
                        {props.children}
                      </Box>
                    </Container>
                  )}
                </Box>
                {showSidebar && (
                  <>
                    <Hidden lgUp>
                      <Fab
                        className={classes.menuIcon}
                        onClick={toggleSmallScreenDrawer}
                        color="secondary"
                      >
                        <MenuIcon />
                      </Fab>
                    </Hidden>
                    <Hidden lgUp>
                      <SmallScreenDrawer
                        open={isSmallScreenDrawerOpen}
                        toggleDrawer={toggleSmallScreenDrawer}
                      />
                    </Hidden>
                  </>
                )}
              </Box>

              {!props.isLogin && <Footer />}
            </Box>
          </Provider>
        </ThemeProvider>
      </StylesProvider>
    </AppError>
  );
};
Layout.propTypes = {
  isLogin: PropTypes.bool,
  isRegister: PropTypes.bool,
  isDemo: PropTypes.bool,
};
Layout.defaultTypes = {
  isLogin: false,
  isRegister: false,
  isDemo: false,
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(memo(Layout));

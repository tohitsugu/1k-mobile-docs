/* Core */
import React from "react";
import { NavLink, useLocation, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@material-ui/core";
/* Components */
import CustomButton from "../Button";
import CustomSnackbar from "../Snakbar";
import { HeaderMenu } from "./HeaderMenu";
/* Hooks */
import { useAuth } from "../../Auth/hooks/useAuth";
import { useHeader } from "./hooks/useHeader";
import { useSession } from "./hooks/useSessions";
/* Config */
import { links } from "../../../navigation/config";

const useStyles = makeStyles((theme) => ({
  rootAppBar: {
    top: 0,
    boxShadow: (props) =>
      props.authenticated || props.rootPage ? theme.shadows[1] : "none",
    backgroundColor: (props) =>
      props.authenticated || props.rootPage
        ? theme.palette.neutral.white
        : "transparent",
  },
  rootToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    minHeight: 76,
  },
  logoImg: { height: "33px" },
  title: {
    fontSize: "20px",
    fontWeight: "400",
    letterSpacing: "0.10000000149011612px",
    textAlign: "left",
    color: "#416EE6",
    padding: "0px 12px 6px",
  },
  betaTag: {
    padding: "5px 10px 5px 10px",
    borderRadius: "12px",
    fontSize: "8px",
    background: "#F2F3FD",
    color: "#7281E8",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  signinBtn: {
    border: "1px solid #cbc8d3",
    backgroundColor: "#ffffff",
    color: theme.palette.secondary.light,
    marginRight: "20px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "15px",
      marginLeft: "10px",
    },
  },
  gsBtn: {
    border: "1px solid #cbc8d3",
    backgroundColor: theme.palette.secondary.light,
    color: "#F7F9FA",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Header = ({ isLogin, isRegister, isHome }) => {
  const { pathname, search } = useLocation();
  const { handleSignIn, handleRegister } = useHeader();
  const { message, authenticated } = useAuth();
  const registerPage =
    pathname === `${links.register}` || pathname === `${links.register}/`;
  const requestInvitePage =
    pathname === `${links.requestAnInvite}` ||
    pathname === `${links.requestAnInvite}/`;
  const rootPage = pathname === `${links.root}`;
  const classes = useStyles({
    authenticated: authenticated,
    registerPage,
    rootPage,
  });
  if (!authenticated && !isLogin && !isHome && !isRegister) {
    return <Redirect to={`${links.root}`} />;
  }
  if (authenticated && (isLogin || isHome || isRegister)) {
    return <Redirect to={`${links.dashboard}`} />;
  }
  const renderLogo = () => {
    return (
      <img
        className={classes.logoImg}
        src={`${window?.location?.protocol}//${window?.location?.host}/devportal/img/logo.svg`}
        alt="logo"
      />
    );
  };

  if (isLogin && !isRegister) {
    return message ? <CustomSnackbar message={message} /> : null;
  }

  return (
    <>
      {message && isHome && <CustomSnackbar message={message} />}
      {registerPage ? (
        <AppBar className={classes.rootAppBar}>
          <Toolbar>
            <Box className={classes.rootToolbar}>
              <Box className={classes.container}>
                <NavLink
                  to={{
                    pathname: `/devportal/`,
                    search,
                  }}
                  className={classes.link}
                >
                  {renderLogo()}
                </NavLink>
              </Box>
              <Box className={classes.container}>
                <Box width="141px" mr={4}>
                  <CustomButton
                    value="Have an account?"
                    className={"whiteButton"}
                    type="submit"
                    variant="outlined"
                    onClick={handleSignIn}
                  />
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar className={classes.rootAppBar}>
          <Toolbar>
            <Box className={classes.rootToolbar}>
              <Box className={classes.container}>
                <NavLink
                  to={{
                    pathname: `/devportal/`,
                    search,
                  }}
                  className={classes.link}
                >
                  {renderLogo()}
                </NavLink>
                <Typography className={classes.title}>Developer</Typography>
                <Typography className={classes.betaTag}>BETA</Typography>
              </Box>
              {!authenticated && (
                <Box className={classes.container}>
                  <CustomButton
                    value={requestInvitePage ? "Back To Sign In" : "Sign In"}
                    className={classes.signinBtn}
                    onClick={handleSignIn}
                  />
                  <CustomButton
                    value="Getting Started"
                    className={classes.gsBtn}
                    onClick={handleRegister}
                  />
                </Box>
              )}
            </Box>
            <Box flexGrow="1" display="flex" justifyContent="flex-end">
              {authenticated && <HeaderMenu />}
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

Header.propTypes = {
  isLogin: PropTypes.bool,
  isRegister: PropTypes.bool,
  isHome: PropTypes.bool,
};

Header.defaultProps = {
  isLogin: false,
  isRegister: false,
  isHome: false,
};

export default Header;

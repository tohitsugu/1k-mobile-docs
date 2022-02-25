/* Core */
import React from "react";
import { isMobile } from "react-device-detect";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
/* Components */
import { QRCodeTab } from "./QRCodeTab";
import CustomButton from "../../../CommonComponents/Button";
/* Hooks */
import { useAuth } from "../../hooks/useAuth";
import { usePasswordLess } from "../../hooks/usePasswordLess";
import { useHomePage } from "../../../Home/hooks/useHomePage";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 20,
    padding: "48px 0",
    height: (props) => props.containerHeight,
    marginBottom: "20px",
    boxShadow: "0px 16px 32px rgba(0, 37, 86, 0.1)",
  },
  container: {
    height: "100%",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "calc(460px - 5%)",
    },
  },
  tabsLabel: {
    color: theme.palette.secondary.main,
    marginBottom: "12px",
    userSelect: "none",
  },
  tabsContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "10%",
    },
  },
  formContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto",
  },
  appsTitle: {
    fontSize: "0.875rem",
    color: theme.palette.secondary.light,
    userSelect: "none",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
    },
  },
  appsLink: {
    color: "#1C89B6",
    marginLeft: "20px",
    textDecoration: "none",
    cursor: "pointer",
    userSelect: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  slide: {
    height: "100%",
    "&>div": {
      height: "100%",
    },
  },
  paperWrapper: {
    width: "100%",
    maxWidth: 327,
    [theme.breakpoints.up("lg")]: {
      maxWidth: 402,
    },
  },
  logoImg: { height: "33px" },
  loginLogo: {
    display: "flex",
    justifyContent: "center",
    userSelect: "none",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 285,
    [theme.breakpoints.up("lg")]: {
      backgroundColor: "#550095",
      backgroundImage: `url(${window?.location?.protocol}//${window?.location?.host}/devportal/img/bc-login.svg)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPositionY: "bottom",
      backgroundPositionX: "center",
      bottom: 0,
      right: "unset",
      width: "460px",
      height: "100%",
      position: "fixed",
    },
  },
  tryForFreeLink: {
    textDecoration: "none",
    color: theme.palette.neutral[500],
    fontSize: "1rem",
    justifyContent: "center !important",
    position: "absolute",
    top: "-55px",
    right: "-20px",
  },
}));

export const LoginForm = () => {
  const { sessionIsReady, authenticated, loadingSession } = useAuth();
  const { handleRegister } = useHomePage();
  const { QRValue } = usePasswordLess({
    authenticated,
    loadingSession,
    sessionIsReady,
  });

  let containerHeight = isMobile ? 400 : 500;

  const classes = useStyles({ containerHeight });

  const renderLogo = () => {
    return (
      <Box className={classes.loginLogo}>
        <img
          className={classes.logoImg}
          src={`${window?.location?.protocol}//${window?.location?.host}/devportal/img/logo.svg`}
          alt="logo"
        />
      </Box>
    );
  };

  return (
    <Grid container className={classes.container}>
      {<Box className={classes.background} />}
      <Grid item xs={12} sm={12}>
        <Box className={classes.tabsContainer}>
          <Box className={classes.formContainer}>
            <Typography variant="h1" className={classes.tabsLabel}>
              BlockID Developer Sign In
            </Typography>
            <CustomButton
              value="Sign up"
              className={cx("primaryButton", classes.tryForFreeLink)}
              type="button"
              variant="contained"
              onClick={handleRegister}
            />
            <Box className={classes.paperWrapper}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                pb="27px"
              >
                <div className={classes.tabsWrapper}></div>
              </Box>
              <Paper className={classes.root}>
                <QRCodeTab renderLogo={renderLogo} sessionValue={QRValue} />
              </Paper>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb="10px"
                position="relative"
                zIndex="1"
              >
                <Typography
                  variant="body1"
                  className={classes.appsTitle}
                  component="div"
                >
                  Don’t have the app?
                </Typography>

                <a
                  href="https://apps.apple.com/us/app/blockid/id1539421428"
                  title="https://apps.apple.com/us/app/blockid/id1539421428"
                  target="blank"
                  className={classes.appsLink}
                >
                  IOS
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.onekosmos.kernel.blockid"
                  title="https://play.google.com/store/apps/details?id=com.onekosmos.kernel.blockid"
                  target="blank"
                  className={classes.appsLink}
                >
                  Android
                </a>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

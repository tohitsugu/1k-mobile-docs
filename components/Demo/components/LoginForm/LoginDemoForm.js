/* Core */
import React from "react";
import { isMobile } from "react-device-detect";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Formik, Form } from "formik";
/* Components */
import { FormikInputField } from "../../../CommonComponents/Formik/FormikInputField";
import { QRCodeDemoTab } from "./QRCodeDemoTab";
/* Hooks */
import { useDemoAuth } from "../../hooks/useDemoAuth";
import { useDemoPasswordLess } from "../../hooks/useDemoPasswordLess";
/* Config */
import * as config from "../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 20,
    padding: "30px 0",
    height: (props) => props.containerHeight,
    marginBottom: "20px",
    boxShadow: "0px 16px 32px rgba(0, 37, 86, 0.1)",
  },
  container: {
    height: "100%",
    flexWrap: "wrap-reverse",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "calc(600px - 5%)",
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
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#f5f6f7",
    padding: "30px 10px",
    [theme.breakpoints.up("lg")]: {
      bottom: 0,
      right: "unset",
      width: "600px",
      height: "100%",
      position: "fixed",
    },
  },

  preBlockNormal: {
    backgroundColor: theme.palette.neutral.white,
    minHeight: 130,
    maxHeight: "200px",
    borderTop: `3px solid ${theme.palette.primary.main}`,
  },
  preBlockFullWith: {
    backgroundColor: theme.palette.neutral.white,
    minHeight: 130,
    maxHeight: "400px",
    borderTop: `3px solid ${theme.palette.primary.main}`,
  },
  codeHeader: {
    paddingBottom: 30,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  scopeInfoMain: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  scopeInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
    paddingTop: 8,
  },
  scopeInfoTypo: {
    fontSize: 12,
  },
}));

export const LoginDemoForm = () => {
  const { sessionIsReady, loadingSession } = useDemoAuth();
  const {
    QRValue,
    handleStartSession,
    sessionValue,
    startSession,
    userData,
    handleScopeChange,
    scope,
    debugList,
    timer,
  } = useDemoPasswordLess({
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
      {
        <Box className={classes.background}>
          <Box className={classes.codeHeader}>
            Start a new session and Scan the QR code:
          </Box>
          <pre className={classes.preBlockNormal}>
            {<strong>Session Info:</strong>}
            {sessionValue &&
              JSON.stringify(
                {
                  sessionId: sessionValue.sessionId,
                  sessionUrl: sessionValue.sessionUrl,
                },
                null,
                2
              )}
          </pre>
          <pre className={classes.preBlockNormal}>
            {<strong>Polling Debug Area:</strong>}
            {debugList && JSON.stringify(debugList, null, 2)}
          </pre>
          <pre className={classes.preBlockFullWith}>
            {<strong>Auth Result:</strong>}
            {userData && JSON.stringify(userData, null, 2)}
          </pre>
        </Box>
      }
      <Grid item xs={12} sm={12}>
        <Box className={classes.tabsContainer}>
          <Box className={classes.formContainer}>
            <Typography variant="h1" className={classes.tabsLabel}>
              BlockID Demo App
            </Typography>

            <Formik initialValues={config.initialValues}>
              <Form autoComplete="off">
                <Box
                  mb={3}
                  maxWidth={554}
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  flexDirection="column"
                  className={classes.scopeInfoMain}
                >
                  <Box maxWidth={554} width="100%">
                    <FormikInputField
                      type="text"
                      name="scope"
                      id="scope"
                      fullWidth
                      label="Scope (Optional)"
                      helperText=""
                      onChange={handleScopeChange}
                      value={scope}
                    />
                  </Box>
                  <Box className={classes.scopeInfo}>
                    <Typography
                      variant="body1"
                      className={classes.scopeInfoTypo}
                    >
                      firstname, lastname, ial, aal, ppt, dl, scep_creds,
                      location,deviceid, device_info, dl_front_image,
                      dl_back_image, ppt_image, liveid, nationalid_front_image,
                      nationalid_back_image
                    </Typography>
                  </Box>
                </Box>
              </Form>
            </Formik>
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
                <QRCodeDemoTab
                  renderLogo={renderLogo}
                  sessionValue={QRValue}
                  handleStartSession={handleStartSession}
                  startSession={startSession}
                  timer={timer}
                />
              </Paper>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

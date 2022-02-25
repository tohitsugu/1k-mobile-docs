import React from "react";
import { Formik, Form } from "formik";
import { Box, makeStyles, Typography, Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
/* Components */
import { AppCard } from "../../CommonComponents/AppCard";
import { AppLoading } from "../../CommonComponents/AppLoading";
import { FormikInputField } from "../../CommonComponents/Formik/FormikInputField";
/* Hooks */
import { useDashboard } from "../hooks/useDashboard";
/* Icons */
import { CopyIcon } from "../../../icons/CopyIcon";
import { EyeIcon } from "../../../icons/EyeIcon";
import { EyeOffIcon } from "../../../icons/EyeOffIcon";
/* Navigation */
import { links } from "../../../navigation/config";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: "30px 30px 125px 30px",
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
  header: {
    marginBottom: 20,
  },
  usernameInfo: {
    color: theme.palette.secondary.text,
    marginBottom: 10,
  },
  icon: {
    cursor: "pointer",
    marginBottom: "-6px",
  },
  inputBox: {
    display: "flex",
    alignItems: "end",
  },
  inputBoxApiKey: {
    display: "flex",
    alignItems: "end",
    flexDirection: "column",
  },
  demoBox: {
    width: "100%",
    minHeight: "287px",
    backgroundColor: theme.palette.states.state13,
    borderRadius: 8,
    marginBottom: 64,
    display: "flex",
    alignItems: "center",
  },
  demoBoxContent: {
    display: "flex",
    width: "60%",
    flexDirection: "column",
    padding: "40px 10px 40px 40px",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  demoBoxImage: {
    width: "40%",
    backgroundImage: `url(${window?.location?.protocol}//${window?.location?.host}/devportal/img/Demo-page-experience.png)`,
    minHeight: "287px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
    backgroundPositionX: "right",
    backgroundPositionY: "bottom",
    [theme.breakpoints.down("md")]: {
      display: "none",
      width: "10%",
    },
    [theme.breakpoints.down("lg")]: {
      backgroundSize: "contain !important",
    },
  },
  demoBoxText: {
    color: theme.palette.neutral.white,
    paddingBottom: 16,
  },
  docsContentBox: {
    width: "100%",
    height: "287px",
    borderRadius: 8,
  },
  getDemo: {
    color: "#F8F7FA",
    border: "1px solid #1E0A3C",
    boxShadow: "0px 4px 8px rgb(0 37 86 / 10%)",
    backgroundColor: "#1E0A3C",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    width: "103px",
    justifyContent: "center",
    height: 44,
    "&:hover": {
      color: "#F8F7FA",
      textDecoration: "none",
    },
  },
  iconSvg: {
    borderTopRightRadius: 4,
    fill: "none",
    width: 37,
    height: 37,
    background: "#eeedf2",
    borderBottomRightRadius: 4,
    marginLeft: "-2px",
    paddingTop: 10,
    paddingLeft: 10,
  },
  errorMsg: {
    color: "#f44336",
    fontSize: "0.75rem",
  },
  copyIconButton: {
    position: "absolute",
    right: 10,
    height: 36,
    width: 36,
    "& .MuiIconButton-label": {
      width: "auto",
      display: "flex",
      alignItems: "inherit",
      justifyContent: "inherit",
    },
  },
  copyIcon: {
    width: 37,
    height: 37,
    paddingTop: 10,
    paddingLeft: 12,
    "& path": {
      fill: "#7281e8 !important",
    },
  },
  eyeIconButton: {
    position: "absolute",
    right: 40,
    height: 36,
    width: 36,
    "& .MuiIconButton-label": {
      width: "auto",
      display: "flex",
      alignItems: "inherit",
      justifyContent: "inherit",
    },
  },
  eyeIcon: {
    width: 37,
    height: 37,
    paddingTop: 6,
    paddingLeft: 6,
    "& path": {
      fill: "#7281e8 !important",
    },
  },
}));

const gettingStartedApps = [
  {
    imageUrl: `${window?.location?.protocol}//${window?.location?.host}/devportal/img/UwlIcon.svg`,
    title: "Universal Web Login",
    description:
      "BlockID’s Universal Web Login (UWL) is a flexible authentication framework for all your websites and applications that augments or replaces the traditional username, password & MFA-based login with a passwordless experience by leveraging the user’s biometrics using BlockID mobile app.",
    links: links.uwl,
    buttonLabel: "",
  },
  {
    imageUrl: `${window?.location?.protocol}//${window?.location?.host}/devportal/img/LoginWithOtpIcon.svg`,
    title: "Login with OTP sent via SMS or Email",
    description:
      "Implement authentication on your websites and applications using one-time passcode (OTP) served by BlockID and sent to your users as SMS or email.",
    links: links.loginWithOtp,
    buttonLabel: "",
  },
];

export function DashboardPage() {
  const classes = useStyles();
  const {
    handleContentClick,
    loading,
    handleCopyToClipboard,
    initialValues,
    tokeInfo,
    handleRevealLicense,
    revealLicense,
  } = useDashboard();

  const GoToUserName = ({ value }) => {
    return (
      <IconButton
        onClick={() => handleCopyToClipboard(value)}
        edge="end"
        className={classes.copyIconButton}
      >
        <CopyIcon className={classes.copyIcon} />
      </IconButton>
    );
  };

  const GoToRevealLicense = () => {
    return (
      <IconButton
        onClick={() => handleRevealLicense(!revealLicense)}
        edge="end"
        className={classes.eyeIconButton}
      >
        {!revealLicense ? (
          <EyeOffIcon className={classes.eyeIcon} />
        ) : (
          <EyeIcon className={classes.eyeIcon} />
        )}
      </IconButton>
    );
  };

  return (
    <>
      <Box className={classes.pageContainer}>
        {loading ? (
          <AppLoading />
        ) : (
          <>
            <Typography variant="body1" className={classes.usernameInfo}>
              Welcome {tokeInfo?.user?.firstname || ""}{" "}
              {tokeInfo?.user?.lastname || ""}
            </Typography>
            <Typography variant="h1" className={classes.header}>
              1Kosmos Developer Dashboard
            </Typography>
            {
              <Formik initialValues={initialValues}>
                <Form autoComplete="off">
                  <Box
                    mb={3}
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box
                      maxWidth={554}
                      width="48%"
                      className={classes.inputBoxApiKey}
                    >
                      <Box className={classes.inputBox} width="100%">
                        <Box maxWidth={554} width="100%">
                          <FormikInputField
                            type="text"
                            name="apiKey"
                            id="apiKey"
                            fullWidth
                            label="License Key"
                            placeholder="Click to reveal license"
                            value={revealLicense ? initialValues?.apiKey : ""}
                            disabled
                            adornment={
                              <>
                                {<GoToUserName value={initialValues?.apiKey} />}
                                <GoToRevealLicense />
                              </>
                            }
                          />
                        </Box>
                      </Box>
                      <Box className={classes.inputBox} width="100%">
                        <Typography
                          variant="body2"
                          className={classes.errorMsg}
                        >
                          {initialValues?.error || ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      maxWidth={554}
                      width="48%"
                      className={classes.inputBoxApiKey}
                    >
                      <Box className={classes.inputBox} width="100%">
                        <Box maxWidth={554} width="100%">
                          <FormikInputField
                            type="text"
                            name="tenantUrl"
                            id="tenantUrl"
                            fullWidth
                            label="Tenant DNS"
                            disabled
                            adornment={
                              <GoToUserName value={initialValues?.tenantUrl} />
                            }
                          />
                        </Box>
                      </Box>
                      <Box className={classes.inputBox} width="100%">
                        <Typography
                          variant="body2"
                          className={classes.errorMsg}
                        ></Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    mb={3}
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box
                      maxWidth={554}
                      width="48%"
                      className={classes.inputBox}
                    >
                      <Box maxWidth={554} width="100%">
                        <FormikInputField
                          type="text"
                          name="tenantTag"
                          id="tenantTag"
                          fullWidth
                          label="Tenant Tag"
                          disabled
                          disabled
                          adornment={
                            <GoToUserName value={initialValues?.tenantTag} />
                          }
                        />
                      </Box>
                    </Box>
                    <Box
                      maxWidth={554}
                      width="48%"
                      className={classes.inputBox}
                    >
                      <Box maxWidth={554} width="100%">
                        <FormikInputField
                          type="text"
                          name="communityName"
                          id="communityName"
                          fullWidth
                          label="Community"
                          disabled
                          disabled
                          adornment={
                            <GoToUserName
                              value={initialValues?.communityName}
                            />
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                </Form>
              </Formik>
            }
            <Box className={classes.demoBox}>
              <Box className={classes.demoBoxContent}>
                <Typography variant="h1" className={classes.demoBoxText}>
                  Try your new BlockID authentication experience
                </Typography>
                <Typography variant="body1" className={classes.demoBoxText}>
                  Experience the BlockID identity based, passwordless
                  authentication. See the ease and power of using biometrics to
                  verify user identity.
                </Typography>
                <Box display="flex" width={"100%"} mt={"10px"}>
                  <a
                    href="https://www.1kosmos.com/demo/"
                    target="new"
                    className={classes.getDemo}
                  >
                    Get a demo
                  </a>
                </Box>
              </Box>
              <Box className={classes.demoBoxImage}></Box>
            </Box>
            <Box className={classes.docsContentBox}>
              <Grid container spacing={3} className={classes.featured}>
                {gettingStartedApps.map((item) => (
                  <Grid item xs={12} md={6} lg={6} xl={6} key={item.title}>
                    <AppCard
                      {...item}
                      handleClick={() => handleContentClick(item.links)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

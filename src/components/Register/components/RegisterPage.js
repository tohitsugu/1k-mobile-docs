/* Core */
import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
/* Components */
import { AppLoading } from "../../CommonComponents/AppLoading";
import CustomButton from "../../CommonComponents/Button";
import { FormikInputField } from "../../CommonComponents/Formik/FormikInputField";
import CustomSnackbar from "../../CommonComponents/Snakbar";
/* Hooks */
import { useRegister } from "../hooks/useRegister";
/* Config */
import * as config from "../config";
/* Navigation */
import { links } from "../../../navigation/config";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.secondary.light,
    textAlign: "center",
    marginBottom: "8px",
  },
  subTitle: {
    color: theme.palette.secondary.text,
    textAlign: "center",
    fontSize: "1rem",
    marginBottom: "40px",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  wrapperLoader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
  formWrapper: {
    width: "320px",
    [theme.breakpoints.up("md")]: {
      width: "424px",
    },
  },
  btnFreeTrial: {
    width: "100%",
  },
}));

export const RegisterPage = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { message } = useSelector((state) => state.auth);
  const { handleSubmit, loading } = useRegister();

  if (pathname.charAt(pathname.length - 1) === "/") {
    return <Redirect to={`${links.register}`} />;
  }

  return (
    <>
      {message && <CustomSnackbar message={message} />}
      <Box mt={"10%"}>
        <Box className={classes.wrapperLoader}>
          {loading && <AppLoading size={48} />}
        </Box>
        <Box className={classes.wrapper}>
          <Box className={classes.formWrapper}>
            <Typography variant="h1" className={classes.title}>
              Try BlockID for Free
            </Typography>
            <Typography variant="body1" className={classes.subTitle}>
              Sign up for identity-based, passwordless access through BlockID
            </Typography>
            <Formik
              onSubmit={handleSubmit}
              initialValues={config.initialValues}
              validationSchema={config.validationSchema}
            >
              <Form autoComplete="off">
                <Box
                  mb={3}
                  maxWidth={554}
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box maxWidth={554} width="48%">
                    <FormikInputField
                      type="text"
                      name="fname"
                      id="fname"
                      fullWidth
                      label="First Name"
                      required
                    />
                  </Box>
                  <Box maxWidth={554} width="48%">
                    <FormikInputField
                      type="text"
                      name="lastname"
                      id="lastname"
                      fullWidth
                      label="Last Name"
                      required
                    />
                  </Box>
                </Box>

                <Box mb={"15px"}>
                  <FormikInputField
                    type="text"
                    name="phone"
                    id="phone"
                    fullWidth
                    label="Phone Number"
                    required
                  />
                </Box>
                <Box mb={"15px"}>
                  <FormikInputField
                    type="text"
                    name="email"
                    id="email"
                    fullWidth
                    label="Email Address"
                    key={String(loading)}
                    required
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  width={"100%"}
                  mb={"15px"}
                >
                  <CustomButton
                    value="Start Free Trial"
                    className={`primaryButton ${classes.btnFreeTrial}`}
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  />
                </Box>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Box>
    </>
  );
};

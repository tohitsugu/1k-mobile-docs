/* Core */
import React from "react";
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
import { useRequestAnInvite } from "../hooks/useRequestAnInvite";
/* Config */
import * as config from "../config";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#000",
    textAlign: "center",
    marginBottom: "8px",
  },
  subTitle: {
    color: theme.palette.secondary.text,
    textAlign: "center",
    fontSize: "0.875rem",
    marginBottom: "40px",
  },
  goToLoginButton: {
    position: "fixed",
    top: 16,
    right: 90,
    width: 141,
    zIndex: 1204,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop: "20%",
  },
  formWrapper: {
    width: "320px",
    [theme.breakpoints.up("md")]: {
      width: "424px",
    },
  },
}));

export const RequestAnInvitePage = () => {
  const classes = useStyles();
  const { handleSubmit, loading, showUserName } = useRequestAnInvite();
  const { message } = useSelector((state) => state.auth);

  return (
    <>
      {message && <CustomSnackbar message={message} />}
      <Box className={classes.wrapper}>
        <Box className={classes.formWrapper}>
          <Typography variant="h1" className={classes.title}>
            Request an invite
          </Typography>
          <Typography variant="body1" className={classes.subTitle}>
            Sign up for passwordless access through BlockID
          </Typography>
          <Formik
            onSubmit={handleSubmit}
            initialValues={config.initialValues}
            validationSchema={config.validationSchema}
          >
            <Form autoComplete="off">
              {loading && <AppLoading size={48} />}
              <Box mb={"15px"}>
                <FormikInputField
                  type="text"
                  name="email"
                  id="email"
                  fullWidth
                  label="Registered Email address"
                  required
                />
              </Box>

              {showUserName && (
                <Box mb={"15px"}>
                  <FormikInputField
                    type="text"
                    name="username"
                    id="username"
                    fullWidth
                    label="Provide your username"
                    autoFocus
                    key={String(loading)}
                  />
                </Box>
              )}
              <Box display="flex" justifyContent="center" pt={"10px"}>
                <Box width={"113px"}>
                  <CustomButton
                    value="Send Invite"
                    className={"redButton"}
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  />
                </Box>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
    </>
  );
};

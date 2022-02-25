/* Core */
import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
/* Components */
import { LoginForm } from "./LoginForm/LoginForm";
/* Navigation */
import { links } from "../../../navigation/config";

export const LoginPage = () => {
  const { pathname } = useLocation();

  if (pathname.charAt(pathname.length - 1) === "/") {
    return <Redirect to={`${links.login}`} />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      position="relative"
    >
      <LoginForm />
    </Box>
  );
};

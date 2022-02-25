/* Core */
import React from "react";
import Box from "@material-ui/core/Box";
/* Components */
import { LoginDemoForm } from "./LoginForm/LoginDemoForm";

export const DemoPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      position="relative"
    >
      <LoginDemoForm />
    </Box>
  );
};

/* Core */
import React from "react";
import Box from "@material-ui/core/Box";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Dots } from "@zendeskgarden/react-loaders";

export function AppLoading({ size, className }) {
  return (
    <Box
      display="flex"
      width="100%"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      left="0"
      right="0"
      top="0"
      bottom="0"
      zIndex="1000"
      inset="auto !important"
      className={className || ""}
    >
      <ThemeProvider>
        <Dots size={size || 64} delayMS={0} />
      </ThemeProvider>
    </Box>
  );
}

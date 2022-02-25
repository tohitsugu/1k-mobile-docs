/* Core */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const StyledButton = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 16px",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: `${theme.palette.neutral.white} !important`,
      color: theme.palette.secondary.light,
    },
  },
  label: {
    fontWeight: theme.typography.fontWeightSemiBold,
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
}))(Button);

const CustomButton = (props) => {
  const { icon, value, className = "", ...rest } = props;

  return (
    <StyledButton className={className} startIcon={icon} {...rest}>
      {value}
    </StyledButton>
  );
};

export default CustomButton;

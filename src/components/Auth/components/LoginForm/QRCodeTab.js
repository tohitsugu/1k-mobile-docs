/* Core */
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import QRCode from "react-qr-code";
import { isMobile } from "react-device-detect";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
/* Components */
import CustomButton from "../../../CommonComponents/Button";
import { AppLoading } from "../../../CommonComponents/AppLoading";
/* Hooks */
import { useHomePage } from "../../../Home/hooks/useHomePage";
/* Icons */
import { PhoneIcon } from "../../../../icons/PhoneIcon";

const useStyles = makeStyles((theme) => ({
  mobileButton: {
    textTransform: "uppercase",
    border: (props) =>
      `1px solid #${props?.brandingSettings?.primary_button_color} !important`,
    backgroundColor: (props) =>
      `#${props?.brandingSettings?.primary_button_color} !important`,
  },
  qrCode: {
    padding: "24px",
    height: "100%",
    [theme.breakpoints.up("md")]: {
      padding: "24px",
    },
  },
  tryForFreeLink: {
    textDecoration: "none",
    fontSize: "1rem",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
    justifyContent: "center !important",
    marginLeft: 5,
  },
  appsTitle: {
    fontSize: "0.875rem",
    color: theme.palette.secondary.light,
    userSelect: "none",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
    },
    marginRight: 5,
  },
  box_requestInvite: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
    },
  },
}));

export const QRCodeTab = (props) => {
  const { handleRequestInvite } = useHomePage();
  const { sessionValue, renderLogo } = props;
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      textAlign="center"
      height="100%"
    >
      {renderLogo()}
      {!sessionValue ? (
        <Box
          className={classes.qrCode}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          position="relative"
        >
          <AppLoading size={40} />
        </Box>
      ) : (
        <>
          <Box
            className={classes.qrCode}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
          >
            {isMobile ? (
              <CustomButton
                value="Login with BlockID"
                className={cx("redButton", classes.mobileButton)}
                type="link"
                variant="contained"
                icon={<PhoneIcon />}
                href={sessionValue}
                title={sessionValue}
                target="blank"
                rel="noopener noreferrer"
              />
            ) : (
              <a
                href={sessionValue}
                title={sessionValue}
                target="blank"
                rel="noopener noreferrer"
              >
                <QRCode
                  level="H"
                  size={275}
                  value={sessionValue}
                  fgColor={"#20153c"}
                />
              </a>
            )}
          </Box>
          <Box className={classes.box_requestInvite}>
            <Typography
              variant="body1"
              className={classes.appsTitle}
              component="div"
            >
              Can't access your account?
            </Typography>
            <CustomButton
              value="Request Invite"
              className={cx("linkButton", classes.tryForFreeLink)}
              type="link"
              variant="contained"
              title={"Request Invite"}
              onClick={handleRequestInvite}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

QRCodeTab.propTypes = {
  renderLogo: PropTypes.func.isRequired,
  sessionValue: PropTypes.string,
};

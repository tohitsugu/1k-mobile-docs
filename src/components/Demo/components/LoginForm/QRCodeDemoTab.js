/* Core */
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import QRCode from "react-qr-code";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
/* Components */
import CustomButton from "../../../CommonComponents/Button";
import { AppLoading } from "../../../CommonComponents/AppLoading";
/* Icons */
import { PhoneIcon } from "../../../../icons/PhoneIcon";
import { DashboardIcon } from "../../../../icons/DashboardIcon";

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
    color: theme.palette.neutral[500],
    fontSize: "1rem",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
    justifyContent: "center !important",
  },
  qrCodeBlock: {
    marginBottom: 30,
  },
  timerBox: {
    backgroundColor: theme.palette.neutral.white,
    border: `1px solid ${theme.palette.neutral.main}`,
    justifyContent: "center",
    height: "100%",
    paddingTop: 6,
    borderRadius: 8,
    color: theme.palette.secondary.light,
    fontSize: 12,
    width: 45,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const QRCodeDemoTab = (props) => {
  const { sessionValue, renderLogo, handleStartSession, startSession, timer } =
    props;
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      textAlign="center"
      height="100%"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        textAlign="center"
        width="100%"
        padding="0 6px"
      >
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          width="80%"
          marginLeft="50px"
        >
          {renderLogo()}
        </Box>
        <Box className={classes.timerBox}>
          <DashboardIcon />
          {timer === 120 || timer === 0 ? "..." : timer}
        </Box>
      </Box>

      {!sessionValue && startSession ? (
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
            {sessionValue && (
              <a
                href={sessionValue}
                title={sessionValue}
                target="blank"
                rel="noopener noreferrer"
                className={classes.qrCodeBlock}
              >
                <QRCode
                  level="H"
                  size={275}
                  value={sessionValue}
                  fgColor={"#20153c"}
                />
              </a>
            )}
            {!startSession && (
              <CustomButton
                value={`${timer > 0 ? "Start Session" : "Start New Session"}`}
                className={cx("redButton", classes.mobileButton)}
                type="button"
                variant="contained"
                icon={<PhoneIcon />}
                title={sessionValue}
                onClick={handleStartSession}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

QRCodeDemoTab.propTypes = {
  renderLogo: PropTypes.func.isRequired,
  sessionValue: PropTypes.string,
  handleStartSession: PropTypes.func,
  startSession: PropTypes.bool,
};

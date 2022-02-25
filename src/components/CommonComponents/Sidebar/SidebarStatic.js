/* Core */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
/* Components */
import { DashboardIcon } from "../../../icons/DashboardIcon";
import { ChevronRightIcon } from "../../../icons/ChevronRightIcon";
/* Navigation */
import { config } from "../../../navigation/config";

const sidebarIcons = {
  dashboard: DashboardIcon,
};

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "none",
    position: "fixed",
    top: 72,
    left: 0,
    bottom: 0,
    width: 60,
    background: theme.palette.secondary.main,
    zIndex: 1203,
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
  },
  iconButton: {
    padding: 10,
    "&:hover": {
      "& path": {
        stroke: theme.palette.neutral.main,
      },
    },
  },
  active: {
    "&  button": {
      backgroundColor: theme.palette.secondary.light,
      "& path": {
        stroke: theme.palette.neutral.main,
      },
      "&:hover": {
        borderRadius: "50%",
        backgroundColor: theme.palette.secondary.light,
        "& path": {
          stroke: theme.palette.neutral.main,
        },
      },
    },
  },
  link: {
    margin: "18px 0",
  },
  tooltip: {
    padding: 10,
    fontSize: "1rem",
  },
  toggleButton: {
    position: "absolute",
    top: 10,
    right: "-30px",
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: 0,
    color: theme.palette.neutral[300],
    width: 30,
    height: 32,
    padding: 6,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

export const SidebarStatic = (props) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  let pathArray = pathname.split("/");
  const entity = pathArray && pathArray.length > 1 && pathArray[2];
  const { open, toggleDrawer, setDrawerOpen } = props;
  const sidebarConfig = config.basicUser;

  const sidebarJSX =
    sidebarConfig &&
    sidebarConfig.map((item) => {
      const Icon = sidebarIcons[item.icon];
      return (
        <NavLink
          key={item.name}
          to={`${item.link}`}
          activeClassName={classes.active}
          className={classes.link}
          isActive={() => entity === item.name.toLowerCase()}
          onClick={() => {
            if (!open) {
              setDrawerOpen(true);
            }
          }}
        >
          <Tooltip
            className={classes.tooltip}
            title={item.name}
            placement="right"
            arrow
          >
            <IconButton
              variant="contained"
              color="secondary"
              className={classes.iconButton}
            >
              {Icon && <Icon className={classes.icon} />}
            </IconButton>
          </Tooltip>
        </NavLink>
      );
    });
  return (
    <Box className={classes.navbar}>
      {sidebarJSX}
      {!open && (
        <Fade in={!open} timeout={200}>
          <IconButton
            variant="contained"
            color="secondary"
            className={classes.toggleButton}
            onClick={toggleDrawer}
          >
            <ChevronRightIcon />
          </IconButton>
        </Fade>
      )}
    </Box>
  );
};

SidebarStatic.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
};

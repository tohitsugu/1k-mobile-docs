/* Core */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
/* Components */
import { ChevronLeftIcon } from "../../../icons/ChevronLeftIcon";
/* Navigation */
import { config } from "../../../navigation/config";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingLeft: 16,
    marginBottom: 30,
    marginTop: 32,
  },
  paper: {
    paddingTop: 72,
    paddingLeft: 60,
    zIndex: 2,
  },
  toggleButton: {
    display: "flex",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    right: 6,
    top: 92,
    color: theme.palette.neutral[300],
  },
  link: {
    textDecoration: "none",
    padding: "14px 14px 14px 30px",
    color: theme.palette.secondary.text,
    fontWeight: theme.typography.fontWeightMedium,
    "&:hover": {
      backgroundColor: theme.palette.neutral[100],
      textDecoration: "none",
    },
  },
  active: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.light,
    borderRight: `2px solid ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

export const SidebarDrawer = (props) => {
  const { open, toggleDrawer } = props;
  const classes = useStyles();
  const { pathname } = useLocation();
  let pathArray = pathname.split("/");
  const entity = pathArray && pathArray.length > 1 && pathArray[2];
  const sidebarConfig = config.basicUser;
  const menuItem =
    sidebarConfig &&
    sidebarConfig.find((item) => item.entity.toLowerCase() === entity);
  const subMenuJSX = menuItem?.routes?.map((item) => {
    return (
      <NavLink
        key={item.name}
        to={`${item.link}`}
        activeClassName={classes.active}
        className={classes.link}
        exact={false}
        isActive={(match, location) => {
          const arr = location.pathname.split("/");
          const link = `${arr[3]}/${arr[4]}`;
          return (
            `${location.pathname}` === `${item.link}` || link === item.link
          );
        }}
        target={item.target}
      >
        {item.name}
      </NavLink>
    );
  });

  return (
    <Drawer
      open={open}
      variant="persistent"
      anchor="left"
      classes={{ paper: classes.paper }}
    >
      <Typography variant="h2" className={classes.title}>
        {menuItem?.name}
      </Typography>
      {subMenuJSX}
      <IconButton
        variant="contained"
        color="secondary"
        className={classes.toggleButton}
        onClick={toggleDrawer}
      >
        <ChevronLeftIcon />
      </IconButton>
    </Drawer>
  );
};

SidebarDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

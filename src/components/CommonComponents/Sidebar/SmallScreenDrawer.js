/* Core */
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
/* Components */
import { ChevronLeftIcon } from "../../../icons/ChevronLeftIcon";
import { DashboardIcon } from "../../../icons/DashboardIcon";
/* Navigation */
import { config } from "../../../navigation/config";

const sidebarIcons = {
  dashboard: DashboardIcon,
};

const useStyles = makeStyles((theme) => ({
  title: {
    paddingLeft: 16,
    marginBottom: 30,
    marginTop: 32,
  },
  subTitle: {
    paddingLeft: 16,
  },
  paper: {
    paddingTop: 78,
    paddingLeft: 0,
    width: "100%",
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
    top: 98,
    color: theme.palette.neutral[300],
  },
  link: {
    textDecoration: "none",
    padding: 20,
    color: theme.palette.secondary.text,
    fontWeight: theme.typography.fontWeightMedium,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: theme.palette.neutral[100],
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

export const SmallScreenDrawer = (props) => {
  const { open, toggleDrawer } = props;
  const classes = useStyles();
  const { pathname } = useLocation();
  let pathArray = pathname.split("/");
  const entity = pathArray && pathArray.length > 1 && pathArray[2];
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const sidebarConfig = config.basicUser;

  const toggleSubMenu = () => {
    setSubMenuOpen((open) => !open);
  };

  const menuItem = sidebarConfig?.find(
    (item) => item?.name?.toLowerCase() === entity
  );
  const subMenuJSX = menuItem?.routes?.map((item) => {
    return (
      <NavLink
        key={item.name}
        to={`${item.link}`}
        activeClassName={classes.active}
        className={classes.link}
        exact={false}
        onClick={() => {
          toggleDrawer();
        }}
        isActive={(match, location) => {
          const arr = location.pathname.split("/");
          const link = `${arr[3]}/${arr[4]}`;
          return (
            `${location.pathname}` === `${item.link}` || link === item.link
          );
        }}
      >
        {item.name}
      </NavLink>
    );
  });

  const menuJSX = sidebarConfig?.map((item) => {
    const Icon = sidebarIcons[item.icon];
    return (
      <NavLink
        key={item.name}
        to={`${item.link}`}
        activeClassName={classes.active}
        className={classes.link}
        isActive={() => entity === item.name.toLowerCase()}
        onClick={() => {
          if (!subMenuOpen) {
            setSubMenuOpen(true);
          }
        }}
      >
        <IconButton
          variant="contained"
          color="secondary"
          className={classes.iconButton}
        >
          {Icon && <Icon className={classes.icon} />}
        </IconButton>
        <Typography variant="h4" className={classes.subTitle}>
          {item.name}
        </Typography>
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
      {subMenuOpen && (
        <Typography variant="h2" className={classes.title}>
          {menuItem?.name}
        </Typography>
      )}
      {subMenuOpen ? subMenuJSX : menuJSX}
      <IconButton
        variant="contained"
        color="secondary"
        className={classes.toggleButton}
        onClick={toggleSubMenu}
      >
        <ChevronLeftIcon />
      </IconButton>
    </Drawer>
  );
};

SmallScreenDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

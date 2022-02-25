/* Core */
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  makeStyles,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
/* Components */
import { sidebarConfig } from "../../../navigation/config";

const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    backgroundColor: theme.palette.neutral.white,
    paddingTop: "100px",
    position: "absolute",
    height: "100%",
    width: "20%",
    zIndex: "1",
    [theme.breakpoints.down("lg")]: {
      width: "67px",
    },
  },
  iconContainer: {
    backgroundColor: "#F2F3FD",
    width: "32px",
    height: "32px",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  homeText: {
    display: "block",
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
  link: {
    "&:hover": { textDecoration: "none" },
  },
}));

const SidebarHome = (props) => {
  const { menu } = sidebarConfig;
  const classes = useStyles();
  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <>
      <Box className={classes.sidebarContainer}>
        <List>
          {menu?.map((item, index) => (
            <NavLink
              key={item.name}
              to={`${item.link}`}
              exact={false}
              className={classes.link}
              target={item.target}
            >
              <ListItem button key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {mediumScreen && (
                  <ListItemText
                    className={classes.homeText}
                    primary={item.name}
                  />
                )}
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Box>
    </>
  );
};

export default SidebarHome;

import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Typography,
  Box,
} from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { makeStyles } from "@material-ui/core/styles";
/*Icons */
import { ArrowDownIcon } from "../../../icons/ArrowDownIcon";
import { UserIcon } from "../../../icons/UserIcon";
/* Navigation */
import { topbarConfig } from "../../../navigation/config";
/* Hooks */
import { useAuth } from "../../Auth/hooks/useAuth";
/* Services */
import sessionService from "../../../services/sessionService";

const useStyles = makeStyles((theme) => ({
  userButton: {
    height: 78,
    position: "absolute",
    right: 0,
    top: -6,
    padding: "0 17px 0 17px",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: theme.palette.neutral.main,
    },
    "& > span": { color: theme.palette.secondary.light },
    backgroundColor: (props) =>
      props.open ? theme.palette.neutral.main : theme.palette.neutral.white,
  },
  paper: {
    padding: "8px 0px",
    boxShadow: theme.shadows[3],
    right: "-6px",
    position: "relative",
    borderRadius: "10px 0px 10px 10px",
  },
  userEmail: { color: theme.palette.secondary.light, marginBottom: 3 },
  userRole: { lineHeight: "1.5", color: theme.palette.neutral[400] },
  userSign: {
    backgroundColor: theme.palette.neutral[300],
    borderRadius: "50%",
    color: theme.palette.neutral.main,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "1.5",
    border: `2px solid ${theme.palette.neutral[400]}`,
  },
  horizontalBar: {
    border: `1px solid ${theme.palette.neutral[200]}`,
    margin: "5px 16px",
  },
  menuLabel: {
    color: theme.palette.neutral[400],
    margin: "16px 16px",
    lineHeight: "1.5",
  },
  menuItem: {
    lineHeight: "1.5",
    color: theme.palette.secondary.light,
    padding: "8px 0px",
  },
  link: { textDecoration: "none" },
}));

export const HeaderMenu = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles({ open });
  const anchorRef = React.useRef(null);
  const { handleLogout, tokeInfo } = useAuth();
  const permission = sessionService.getPermission();
  const topSidebarConfig = topbarConfig.basicUser;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event, item) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    item && !item.isAuth && handleLogout();
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const menuItemJSX = (item) => {
    return (
      <MenuItem key={item.name} onClick={(e) => handleClose(e, item)}>
        <Typography variant="body1" className={classes.menuItem}>
          {item.name}
        </Typography>
      </MenuItem>
    );
  };

  const menuJSX = topSidebarConfig?.map((item, index) => {
    return (
      <Box key={index}>
        <Typography variant="body1" className={classes.menuLabel}>
          {item.label}
        </Typography>

        {item?.routes.map((inneritem) => {
          return inneritem.isAuth ? (
            <NavLink
              key={inneritem.name}
              to={`${inneritem.link}`}
              className={classes.link}
            >
              {menuItemJSX(inneritem)}
            </NavLink>
          ) : (
            menuItemJSX(inneritem)
          );
        })}
      </Box>
    );
  });

  const createSignature = () => {
    const fname = tokeInfo?.user?.firstname
      ? tokeInfo?.user?.firstname?.charAt(0).toUpperCase()
      : "";
    const lname = tokeInfo?.user?.lastname
      ? tokeInfo?.user?.lastname?.charAt(0).toUpperCase()
      : "";
    const signature = `${fname}${lname}`;
    return signature !== "" ? (
      <Typography variant="body1" className={classes.userSign}>
        {`${fname}${lname}`}
      </Typography>
    ) : (
      <></>
    );
  };

  return (
    <Box>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.userButton}
        startIcon={<UserIcon />}
        endIcon={<ArrowDownIcon />}
      >
        {`${tokeInfo?.user?.firstname ? tokeInfo?.user?.firstname : ""} ${
          tokeInfo?.user?.lastname ? tokeInfo?.user?.lastname : ""
        }`}
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className={classes.mainPoper}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>
                    <Box marginRight="1rem">
                      <Typography variant="body1" className={classes.userEmail}>
                        {tokeInfo?.user?.email}
                      </Typography>
                    </Box>
                    <Box>{createSignature}</Box>
                  </MenuItem>
                  <hr className={classes.horizontalBar} />
                  {menuJSX}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

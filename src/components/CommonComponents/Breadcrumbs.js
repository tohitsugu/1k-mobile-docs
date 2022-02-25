/* Core */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MBreadcrumbs from "@material-ui/core/Breadcrumbs";
/* Components */
import { ArrowLeftIcon } from "icons/ArrowLeftIcon";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: "0.75rem",
    color: theme.palette.secondary.text,
    "& svg": {
      marginRight: 5,
    },
  },
  separator: {
    marginLeft: 4,
    marginRight: 4,
  },
}));

export const Breadcrumbs = (props) => {
  const classes = useStyles();
  return (
    <MBreadcrumbs
      aria-label="breadcrumb"
      classes={{ separator: classes.separator }}
    >
      {props.links.map((link, index) => {
        return (
          <Link to={link.to} className={classes.link} key={index}>
            {index === 0 && <ArrowLeftIcon />}
            {link.label}
          </Link>
        );
      })}
      {props.title && (
        <Typography className={classes.link}>{props.title}</Typography>
      )}
    </MBreadcrumbs>
  );
};

Breadcrumbs.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array.isRequired,
};

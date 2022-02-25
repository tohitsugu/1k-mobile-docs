/* Core */
import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
/* Components */
import { Breadcrumbs } from "./Breadcrumbs";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 20,
    padding: `32px 32px 48px 32px`,
    height: "auto",
    boxShadow: "none",
    position: "relative",
    border: `1px solid ${theme.palette.neutral[200]}`,
  },
  title: {
    color: theme.palette.secondary.light,
    fontWeight: theme.typography.fontWeightSemiBold,
    marginBottom: theme.spacing(1),
  },
  description: {
    color: theme.palette.secondary.text,
    "& a": {
      color: theme.palette.accent.main,
    },
  },
}));

export const BasicPage = (props) => {
  const classes = useStyles();
  const {
    title = "",
    description = "",
    paperClassName = "",
    wrapperClassName = "",
    headerClassName = "",
    headerRightContentClassName = "",
    headerRightContent,
    breadcrumbs,
    breadcrumbsTitle,
    children,
    icon,
  } = props;

  return (
    <Box
      flexDirection="column"
      py={6}
      display="flex"
      height="auto"
      className={wrapperClassName}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Box mb={2}>
          <Breadcrumbs links={breadcrumbs} title={breadcrumbsTitle} />
        </Box>
      )}
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          alignItems="center"
          mb="32px"
          className={headerClassName}
        >
          {icon && (
            <Box marginRight="20px" flex="1 0 auto">
              {icon}
            </Box>
          )}
          <Box>
            {title && (
              <Typography variant="h1" className={classes.title}>
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                variant="body1"
                className={cx("paragraph", classes.description)}
              >
                {description}
              </Typography>
            )}
          </Box>
        </Box>
        {headerRightContentClassName && (
          <Box
            display="flex"
            alignItems="center"
            mb="32px"
            className={headerRightContentClassName}
          >
            {headerRightContent && (
              <Box display="flex" flexDirection={"row"}>
                {headerRightContent}
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Paper className={cx(classes.paper, paperClassName)}>{children}</Paper>
    </Box>
  );
};

BasicPage.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.node.isRequired,
  paperClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  breadcrumbs: PropTypes.array,
  breadcrumbsTitle: PropTypes.string,
  icon: PropTypes.element,
};

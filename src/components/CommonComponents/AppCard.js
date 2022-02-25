/* Core */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
/* Components */
import CustomButton from "./Button";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 20,
    padding: theme.spacing(3),
    width: "100%",
    cursor: "pointer",
    boxShadow: "none",
    border: `1px solid ${theme.palette.neutral[200]}`,
    "&:hover": {
      boxShadow: theme.shadows[3],
    },
  },
  image: {
    maxWidth: "100%",
    display: "block",
    marginBottom: 20,
    height: 48,
  },
  title: {
    color: theme.palette.secondary.light,
    fontWeight: theme.typography.fontWeightSemiBold,
    marginBottom: 10,
  },
  description: {
    color: theme.palette.secondary.text,
    marginBottom: 20,
  },
}));

export const AppCard = (props) => {
  const { imageUrl, title, handleClick, description, buttonLabel } = props;
  const classes = useStyles();

  return (
    <Box display="flex" width="100%" onClick={handleClick}>
      <Paper className={classes.paper}>
        <img src={imageUrl} alt={title} className={classes.image} />
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.description}>
          {description}
        </Typography>
        {buttonLabel && (
          <Box minWidth={160}>
            <CustomButton
              value={buttonLabel}
              className="linkButton"
              type="button"
              variant="contained"
              onClick={handleClick}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

AppCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

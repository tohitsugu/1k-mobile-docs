/* Core */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
/* Actions */
import { authActions } from "../Auth/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    color: (props) => (props.type === "success" ? "#007A3B" : "#C60025"),
  },
  action: {
    background: "transparent",
    border: "none",
    color: theme.palette.accent.main,
    textDecoration: "underline",
    marginTop: 10,
    padding: 0,
    fontSize: "1rem",
    cursor: "pointer",
  },
}));

const StyledSnackbar = React.forwardRef(({ message }, ref) => {
  const dispatch = useDispatch();
  const classes = useStyles({ type: message.severity });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(authActions.clearMessage());
  };

  const handleActionClick = () => {
    dispatch(authActions.clearMessage());
    message?.onActionClick();
  };
  useEffect(() => {
    return () => dispatch(authActions.clearMessage());
  }, [dispatch]);

  return (
    <Snackbar
      key={message?.text}
      anchorOrigin={{
        vertical: message?.verticalPosition || "top",
        horizontal: message?.horizontalPosition || "right",
      }}
      open={message.show}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={message?.severity}
        variant={message?.variant}
        ref={ref}
      >
        {message?.title && (
          <AlertTitle classes={{ root: classes.root }}>
            {message?.title}
          </AlertTitle>
        )}
        <div>{message?.text}</div>
        {message?.action && (
          <button className={classes.action} onClick={handleActionClick}>
            {message?.action}
          </button>
        )}
      </Alert>
    </Snackbar>
  );
});

export default class CustomSnackbar extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }
  render() {
    return <StyledSnackbar ref={this.wrapper} {...this.props}></StyledSnackbar>;
  }
}

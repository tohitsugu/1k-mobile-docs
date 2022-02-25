/* Core */
import React, { useState, useCallback, useRef } from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import cx from "classnames";
import { HexColorPicker } from "react-colorful";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";
import Popper from "@material-ui/core/Popper";
import Box from "@material-ui/core/Box";
/* Icons */
import { CopyIcon } from "../../../icons/CopyIcon";
import { FormErrorIcon } from "../../../icons/FormErrorIcon";
import { TextAreaCornerIcon } from "../../../icons/TextAreaCornerIcon";
import { EyeIcon } from "../../../icons/EyeIcon";
import { EyeOffIcon } from "../../../icons/EyeOffIcon";
/* Hooks */
import { useClickOutside } from "../../../shared/hooks/useClickOutside";
/* Styles */
import "text-security/text-security-disc.css";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    "& > input": {
      paddingLeft: (props) => (props.withColor ? "76px !important" : "10px"),
    },
  },
  label: {
    display: "block",
    color: theme.palette.secondary.light,
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: 3,
  },
  textareaIcon: {
    position: "absolute",
    right: 2,
    bottom: 2,
  },
  hideValue: {
    fontFamily: "text-security-disc !important",
    "-webkit-text-security": "disc !important",
  },
  helperText: { display: "inline-flex !important" },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  color: {
    width: 40,
    height: 20,
    position: "absolute !important",
    left: 16,
    top: 9,
    zIndex: 1,
    border: "none",
    borderRadius: 2,
    cursor: "pointer",
    backgroundColor: (props) =>
      props.color && props.color.length === 6 ? `#${props.color}` : "#000",
    "&::after": {
      content: '"#"',
      position: "absolute",
      zIndex: 1,
      right: "-20px",
      top: 1,
      color: theme.palette.secondary.light,
    },
  },
  popper: {
    zIndex: 2,
  },
}));

export const FormikInputField = (props) => {
  const {
    label,
    required,
    error,
    helperText,
    hideValue,
    validate,
    type,
    adornment,
    withColor,
    className = "",
    ...rest
  } = props;
  const [field, meta, helpers] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const popover = useRef();

  const close = useCallback(() => setAnchorEl(null), []);
  useClickOutside(popover, close);

  const classes = useStyles({ color: field.value, withColor });

  const isError = (meta.touched && !!meta.error) || !!error;
  const handleEyeClick = () => {
    setShowPassword((show) => !show);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleChangeColor = (value) => {
    const color = value?.slice(1);
    helpers.setValue(color);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const endAdornment =
    type === "password" ? (
      <IconButton
        onClick={handleEyeClick}
        edge="end"
        className={classes.eyeIcon}
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </IconButton>
    ) : type === "withIcon" ? (
      <IconButton
        onClick={handleEyeClick}
        edge="end"
        className={classes.eyeIcon}
      >
        <CopyIcon />
      </IconButton>
    ) : null;

  const startAdornment = withColor ? (
    <Box position="absolute" top="0">
      <Box
        className={classes.color}
        component="button"
        type="button"
        onClick={handleClick}
      ></Box>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        className={classes.popper}
        ref={popover}
      >
        <HexColorPicker
          color={`#${field.value}`}
          onChange={handleChangeColor}
        />
      </Popper>
    </Box>
  ) : null;

  return (
    <>
      {label && (
        <Typography
          variant="body2"
          component="label"
          htmlFor={props.id || props.name}
          className={classes.label}
        >
          {label} {required && "*"}
        </Typography>
      )}
      <InputBase
        {...field}
        {...rest}
        type={showPassword ? "text" : type}
        className={hideValue ? classes.hideValue : cx(classes.root, className)}
        error={isError}
        id={props.id || props.name}
        startAdornment={startAdornment}
        endAdornment={
          props.multiline ? (
            <TextAreaCornerIcon className={classes.textareaIcon} />
          ) : (
            adornment || endAdornment
          )
        }
      />
      {isError && (
        <FormHelperText error className={classes.helperText}>
          <FormErrorIcon />
          {meta.error || error}
        </FormHelperText>
      )}
      {!isError && helperText && (
        <FormHelperText className={classes.helperText}>
          {helperText}
        </FormHelperText>
      )}
    </>
  );
};

FormikInputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  required: PropTypes.bool,
  id: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  withColor: PropTypes.bool,
  className: PropTypes.string,
};

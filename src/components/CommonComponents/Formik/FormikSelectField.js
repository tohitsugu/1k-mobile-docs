/* Core */
import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import ListSubheader from "@material-ui/core/ListSubheader";
/* Components */
import { SelectArrowIcon } from "../../../icons/SelectArrowIcon";
import { FormErrorIcon } from "../../../icons/FormErrorIcon";

const useStyles = makeStyles((theme) => ({
  icon: {
    right: "5px",
    top: "8px",
  },
  label: {
    display: "block",
    color: theme.palette.secondary.light,
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: 3,
  },
  disabled: {
    pointerEvents: "none",
    opacity: "0.3",
  },
}));

export const FormikSelectField = (props) => {
  const {
    options,
    id,
    label,
    name,
    error,
    helperText,
    isGrouped,
    placeholder,
    required,
    ...rest
  } = props;
  const classes = useStyles();
  const [field, meta] = useField(name);
  const isError = (meta.touched && !!meta.error) || !!error;

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
      <Select
        fullWidth
        id={id}
        {...field}
        {...rest}
        label={label}
        classes={{ icon: classes.icon }}
        IconComponent={SelectArrowIcon}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
        input={
          <InputBase
            error={(meta.touched && !!meta.error) || !!error}
            placeholder={placeholder}
          />
        }
      >
        {options.map((option) => {
          if (isGrouped) {
            const groupJSX = option.options.map((item) => (
              <MenuItem
                value={item.value}
                className={item.disabled ? classes.disabled : ""}
                disabled={item.disabled}
                key={item.value}
              >
                {item.label}
              </MenuItem>
            ));
            return [<ListSubheader>{option.label}</ListSubheader>, ...groupJSX];
          } else {
            return (
              <MenuItem
                value={option.value}
                key={option.value}
                className={option.disabled ? classes.disabled : ""}
              >
                {option.label}
              </MenuItem>
            );
          }
        })}
      </Select>
      {isError && (
        <FormHelperText error>
          <FormErrorIcon />
          {meta.error || error}
        </FormHelperText>
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </>
  );
};

FormikSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
  id: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  isGrouped: PropTypes.bool,
  placeholder: PropTypes.string,
};

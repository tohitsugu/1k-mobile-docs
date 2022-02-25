/* Core */
import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 22,
    height: 21,
    fill: "none",
    "& > line": {
      stroke: theme.palette.neutral[400],
      strokeWidth: "1.5",
    },
  },
}));

export const TextAreaCornerIcon = ({ className = "" }) => {
  const classes = useStyles();
  return (
    <svg
      className={cx(classes.icon, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="1.48344" y1="20.0525" x2="21.0584" y2="1.45624" />
      <line x1="12.4834" y1="19.7212" x2="21.1834" y2="11.4562" />
    </svg>
  );
};

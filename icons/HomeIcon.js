/* Core */
import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 32,
    height: 32,
    fill: "none",
  },
}));

export const HomeIcon = ({ className = "" }) => {
  const classes = useStyles();
  return (
    <svg
      className={cx(classes.icon, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="4" fill="#F2F3FD" />
      <g clipPath="url(#clip0_3122_590)">
        <path
          d="M16 7.66663L7.66663 14.3333V25.1666H13.5V19.3333H18.5V25.1666H24.3333V14.3333L16 7.66663Z"
          stroke="#416EE6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3122_590">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(6 6)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

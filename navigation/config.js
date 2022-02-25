/* Core */
import React from "react";
/* Icons */
import { DocsIcon } from "../icons/DocsIcon";
import { HomeIcon } from "../icons/HomeIcon";

export const links = Object.freeze({
  root: "/devportal/",
  login: "/devportal/login",
  register: "/devportal/register",
  requestAnInvite: "/devportal/request-an-invite",
  dashboard: "/devportal/dashboard",
  uwl: "/devportal/docs/uwl",
  loginWithOtp: "/devportal/docs/otp",
  docs: "/devportal/docs",
});

export const topbarConfig = {
  basicUser: [
    {
      routes: [
        {
          name: "Logout",
          link: null,
          isAuth: false,
        },
      ],
    },
  ],
};

export const sidebarConfig = {
  menu: [
    {
      name: "Home",
      link: links.root,
      icon: <HomeIcon />,
      isAuth: false,
      target: "_self",
    },
    {
      name: "Documentation",
      link: links.docs,
      icon: <DocsIcon />,
      isAuth: false,
      target: "_blank",
    },
  ],
};
export const config = {
  basicUser: [
    {
      name: "Dashboard",
      link: links.dashboard,
      icon: "dashboard",
      entity: "dashboard",
      routes: [
        {
          name: "Getting Started",
          link: links.dashboard,
          target: "_self",
        },
        {
          name: "Documentation",
          link: links.docs,
          target: "_blank",
        },
      ],
    },
  ],
};

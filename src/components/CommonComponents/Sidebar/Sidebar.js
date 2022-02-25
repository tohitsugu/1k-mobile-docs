/* Core */
import React from "react";
import PropTypes from "prop-types";
/* Components */
import { SidebarStatic } from "./SidebarStatic";
import { SidebarDrawer } from "./SidebarDrawer";

export const Sidebar = (props) => {
  const { toggleDrawer, isDrawerOpen, setDrawerOpen } = props;
  return (
    <>
      <SidebarStatic
        toggleDrawer={toggleDrawer}
        setDrawerOpen={setDrawerOpen}
        open={isDrawerOpen}
      />
      <SidebarDrawer toggleDrawer={toggleDrawer} open={isDrawerOpen} />
    </>
  );
};

Sidebar.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

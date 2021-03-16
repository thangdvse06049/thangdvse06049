import React from "react";
import { Football } from "../Football";
import { Navigation } from "../Navigation";
import { useStyles } from "./Layout.style";

export const Layout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navigation />
      <Football />
    </div>
  );
};

export default Layout;

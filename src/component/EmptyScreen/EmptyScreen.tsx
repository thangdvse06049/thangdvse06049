import React from "react";
import { useStyles } from "./EmptyScreen.style";

export const EmptyScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.text}>No Data</div>
    </div>
  );
};

export default EmptyScreen;

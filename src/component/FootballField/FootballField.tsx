import React from "react";
import { FootballFieldContent } from "../FootballFieldContent";
import { FootballFieldHeader } from "../FootballFieldHeader";
import { useStyles } from "./FootballField.style";

export const FootballField = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FootballFieldHeader />
      <FootballFieldContent />
    </div>
  );
};

export default FootballField;

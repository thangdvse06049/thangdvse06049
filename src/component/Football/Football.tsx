import React from "react";
import FootballFieldProvider from "../../context/FootballField";
import { FootballField } from "../FootballField";
import { FootballPanel } from "../FootballPanel";
import { useStyles } from "./Football.style";

export const Football = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FootballFieldProvider>
        <FootballPanel />
        <FootballField />
      </FootballFieldProvider>
    </div>
  );
};

export default Football;

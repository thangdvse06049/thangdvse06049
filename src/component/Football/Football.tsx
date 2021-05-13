import React from "react";
import FootballFieldProvider from "../../context/FootballField";
import { FootballField } from "../FootballField";
import { FootballPanel } from "../FootballPanel";
import { SearchPlayer } from "../SearchPlayer";
import { useStyles } from "./Football.style";

export const Football = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FootballFieldProvider>
        <div className={classes.leftPanel}>
          <SearchPlayer />
          <FootballPanel />
        </div>
        <FootballField />
      </FootballFieldProvider>
    </div>
  );
};

export default Football;

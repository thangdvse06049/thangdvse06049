import React from "react";
import { FootballField } from "../FootballField";
import { FootballPanel } from "../FootballPanel";
import { SearchPlayer } from "../SearchPlayer";
import { useStyles } from "./Football.style";

export const Football = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.leftPanel}>
        <SearchPlayer />
        <FootballPanel />
      </div>
      <FootballField />
    </div>
  );
};

export default Football;

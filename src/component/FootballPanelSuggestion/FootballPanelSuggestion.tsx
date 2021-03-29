import React from "react";
import { useStyles } from "./FootballPanelSuggestion.style";
import clsx from "classnames";
const currencyFormatter = require("currency-formatter");

const players = Array(25).fill({
  avatar: "https://via.placeholder.com/150",
  name: "Kevin Aime Perard",
  value: Math.floor(Math.random() * 1000000000),
});

export const FootballPanelSuggestion = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {players.map((player, i) => {
        return (
          <div className={clsx(classes.player, { grey: i % 2 === 0 })}>
            <div
              className={classes.playerAvatar}
              style={{ backgroundImage: `url(${player.avatar})` }}
            />
            <div className={classes.playerName}>{player.name}</div>
            <div className={classes.playerBudget}>
              {currencyFormatter.format(player.value, {
                code: "EUR",
                decimalDigits: 0,
                precision: 0,
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FootballPanelSuggestion;

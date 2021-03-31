import React, { useEffect } from "react";
import { useStyles } from "./FootballPanelSuggestion.style";
import clsx from "classnames";
import { FootballFieldCtx } from "../../context/FootballField";
import { Formation } from "../../models/formation";
import { map } from "lodash";

const currencyFormatter = require("currency-formatter");

const players = Array(25).fill({
  avatar: "https://via.placeholder.com/150",
  name: "Kevin Aime Perard",
  value: Math.floor(Math.random() * 1000000000),
});

export const FootballPanelSuggestion = () => {
  const classes = useStyles();
  const { player, formation, budget, rank } = React.useContext<any>(
    FootballFieldCtx
  );

  const [suggestions, setSuggestions] = React.useState(null as any);

  useEffect(() => {
    if (formation.scheme) {
      setSuggestions(null);
      Formation.getPositionSuggestions(
        formation.scheme,
        player?.position,
        rank,
        budget
      )
        .then((data) => {
          console.log(data);
          setSuggestions(
            data.sort((a: any, b: any) => a.scoreGrade - b.scoreGrade)
          );
        })
        .catch((e) => {
          setSuggestions([]);
        });
    }
  }, [player, rank]);

  return (
    <div className={classes.root}>
      {suggestions && suggestions.length === 0 && (
        <div className={classes.emptySuggestions}>Aucune suggestions</div>
      )}
      {map(suggestions, (player: any, i: number) => {
        return (
          <div className={clsx(classes.player, { grey: i % 2 === 0 })}>
            <div
              className={classes.playerAvatar}
              style={{ backgroundImage: `url(${player.avatar})` }}
            />
            <div className={classes.playerName}>{player.playerName}</div>
            <div className={classes.playerBudget}>
              {currencyFormatter.format(player.marketValue, {
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

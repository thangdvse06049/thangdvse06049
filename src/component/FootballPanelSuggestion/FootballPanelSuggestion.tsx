import React, { useEffect } from "react";
import { useStyles } from "./FootballPanelSuggestion.style";
import clsx from "classnames";
import { FootballFieldCtx } from "../../context/FootballField";
import { Formation } from "../../models/formation";
import { capitalize, map } from "lodash";
import { Team } from "../../models/team";

const currencyFormatter = require("currency-formatter");

export const FootballPanelSuggestion = () => {
  const classes = useStyles();
  const { player, formation, budget, rank } =
    React.useContext<any>(FootballFieldCtx);

  const [suggestions, setSuggestions] = React.useState(null as any);

  useEffect(() => {
    if (formation.scheme) {
      setSuggestions(null);
      Team.getPositionSuggestions(
        player.playerId,
        player?.position,
        parseInt(rank, 10)
      )
        .then((data) => {
          setSuggestions(data);
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
              style={{
                backgroundImage: `url(${player?.player?.imageDataURL})`,
              }}
            />
            <div className={classes.playerInfo}>
              <div className={classes.playerName}>
                {player?.playerName} (
                {capitalize(player?.player.passportArea.name)})
              </div>
              <div>
                Competition: {capitalize(player?.competitionCountry)}
                {", "}
                {capitalize(player?.competitionCategory)}
              </div>
              <div>Team: {capitalize(player?.teamCategory) || "Unknown"}</div>
              <div>
                PPI: {capitalize(player?.ppi)} ({Math.floor(player?.gradeScore)}
                )
              </div>
              <div>
                Status: {capitalize(player?.progression)} ({player?.age})
              </div>
            </div>
            {/* <div className={classes.playerBudget}>
              {currencyFormatter.format(player?.marketValue, {
                code: "EUR",
                decimalDigits: 0,
                precision: 0,
              })}
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default FootballPanelSuggestion;

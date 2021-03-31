import React, { useEffect, useState } from "react";
import { FootballFieldCtx } from "../../context/FootballField";
import { useStyles } from "./FootballFieldContent.style";
import { map, groupBy } from "lodash";
import clsx from "classnames";
import { FORMATIONS } from "../../constants/formation";

export const FootballFieldContent = () => {
  const classes = useStyles();
  const { formation, updatePlayer } = React.useContext<any>(FootballFieldCtx);
  if (!formation) {
    return <></>;
  }

  const columns = FORMATIONS[formation.scheme];
  const formationByPosition = groupBy(formation.players, "position");

  const onDetailsPlayer = (player: any) => {
    updatePlayer(player);
  };

  return (
    <div className={classes.root}>
      <div className={classes.formationLayout}>
        <div className={classes.formation}>
          {map(columns, (positions, index) => {
            return (
              <div
                key={index}
                className={classes.formationColumn}
                style={{ width: `${100 / (columns.length + 1)}%` }}
              >
                {positions.map((position: any, i: number) => {
                  const [player] = formationByPosition[position] || [];
                  return (
                    <div
                      key={i}
                      className={classes.formationPlayer}
                      onClick={() => onDetailsPlayer(player)}
                    >
                      <div className={classes.player}>
                        <div
                          className={classes.playerAvatar}
                          style={{
                            backgroundImage: `url(${
                              player?.avatar ||
                              "https://via.placeholder.com/150"
                            })`,
                          }}
                        />
                        <div className={classes.playerName}>
                          {player?.performance?.playerName}
                        </div>
                      </div>
                      <div
                        className={clsx(
                          classes.status,
                          player?.performance?.gradeLabel
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <img src="/football_field.svg" className={classes.footballField} alt="" />
    </div>
  );
};

export default FootballFieldContent;

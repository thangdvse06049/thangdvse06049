import React, { useEffect } from "react";
import { FootballFieldCtx } from "../../context/FootballField";
import { useStyles } from "./FootballFieldContent.style";
import { map, groupBy, kebabCase } from "lodash";
import clsx from "classnames";
import { FORMATIONS } from "../../constants/formation";
import { UserCtx } from "../../context/User";
import { Team } from "../../models/team";

export const FootballFieldContent = () => {
  const classes = useStyles();
  const { user } = React.useContext<any>(UserCtx);
  const { formation, updatePlayer } = React.useContext<any>(FootballFieldCtx);

  const columns = FORMATIONS[formation.scheme];
  const formationByPosition = groupBy(formation.players, "position");

  const onDetailsPlayer = (player: any) => {
    updatePlayer(player);
  };

  useEffect(() => {
    Team.getTpiToPPi()
      .then((data) => {})
      .catch((e) => {
        console.log(e);
      });
  }, [user.teamId, user.seasonId]);

  if (!formation) {
    return null;
  }

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
                              player?.player?.imageDataURL ||
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
                          kebabCase(player?.performance?.gradeLabel)
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

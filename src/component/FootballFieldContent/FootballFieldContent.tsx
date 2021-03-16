import React from "react";
import { FootballFieldCtx } from "../../context/FootballField";
import { useStyles } from "./FootballFieldContent.style";
import { map } from "lodash";
import clsx from "classnames";

export const FootballFieldContent = () => {
  const classes = useStyles();

  const { formation } = React.useContext(FootballFieldCtx);
  const columns = formation.split("-");

  return (
    <div className={classes.root}>
      <div className={classes.formationLayout}>
        <div className={classes.formation}>
          {map(["1"].concat(columns), (nbPlayers, index) => {
            return (
              <div
                className={classes.formationColumn}
                style={{ width: `${100 / (columns.length + 1)}%` }}
              >
                {Array(parseInt(nbPlayers, 10))
                  .fill("")
                  .map((p) => {
                    return (
                      <div className={classes.formationPlayer}>
                        <div className={classes.player}>
                          <div
                            className={classes.playerAvatar}
                            style={{
                              backgroundImage: `url(https://via.placeholder.com/150)`,
                            }}
                          />
                          <div className={classes.playerName}>
                            Kevin Perard Perard Perard Perard
                          </div>
                        </div>
                        <div className={clsx(classes.status, "excellent")} />
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

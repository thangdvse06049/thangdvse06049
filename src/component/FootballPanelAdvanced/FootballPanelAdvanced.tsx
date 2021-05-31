import React, { useEffect, useState } from "react";
import { map, isEmpty, find } from "lodash";
import { useStyles } from "./FootballPanelAdvanced.style";
import clsx from "classnames";
import { FootballFieldCtx } from "../../context/FootballField";
import { Bar } from "react-chartjs-2";
import { PPI_CATEGORY_LABEL } from "../../constants/ppi";
import { Player } from "../../models/player";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import { Season } from "../../models/season";
import { UserCtx } from "../../context/User";
import { EmptyScreen } from "../EmptyScreen";

const currencyFormatter = require("currency-formatter");

const BMIAGE_KEYS = [
  "Average but bad",
  "Average but good",
  "Bad",
  "Excellent",
  "Good",
  "Terrible",
];

const getGradeFromKey = (key: string) => {
  switch (key) {
    case "Excellent":
      return "excellent";
    case "Good":
      return "good";
    case "Average but good":
      return "ok";
    case "Average but bad":
      return "average";
    case "Bad":
      return "bad";
    case "Terrible":
      return "terrible";
  }
};

const getColor = (v: any) => {
  if (v > 80) {
    return "#4BAEEA";
  } else if (v >= 60) {
    return "#4BAC5B";
  } else if (v >= 50) {
    return "#e4bd26";
  } else if (v >= 40) {
    return "#df8244";
  } else if (v >= 20) {
    return "#ec3323";
  } else {
    return "#68369a";
  }
};

export const FootballPanelAdvanced = () => {
  const classes = useStyles();
  const { player, updatePlayer } = React.useContext<any>(FootballFieldCtx);
  const { user } = React.useContext<any>(UserCtx);
  const [ppi, setPPI] = useState<any>();

  const [season, setSeason] = useState<any>();
  const [seasonOption, setSeasonOption] = useState<any>([]);

  const onChangeSeason = (event: any, option: any) => {
    setSeason(option);
  };

  const fetchPPI = async () => {
    const ppiChart = await Player.getPlayerPPI({
      _id: player?.playerId,
      seasonId: season?._id,
    });
    setPPI(ppiChart?.playerPpi[0]);
  };

  useEffect(() => {
    setPPI(player?.ppi);
  }, [player]);

  useEffect(() => {
    fetchPPI();
  }, [season]);

  useEffect(() => {
    fetchSeason();
  }, []);

  useEffect(() => {
    if (player?.playerId && player?.seasonTeamData === undefined) {
      fetchSeasonTeamOfPlayer(player);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  const fetchSeason = async () => {
    const resSeason = await Season.getListSeasonByCompetitionId();
    const season = find(resSeason, { _id: user.seasonId });
    setSeasonOption(resSeason);
    setSeason(season);
  };

  const fetchSeasonTeamOfPlayer = async (player: any) => {
    const data = await Player.getSeasonTeam({
      teamId: player.player.teamId,
      seasonId: player.player.seasonId,
    });
    updatePlayer({ ...player, seasonTeamData: data });
  };

  return (
    <div className={classes.root}>
      <div className={classes.category}>
        <div className={classes.categoryTitle}>Age ({player?.age})</div>
        <div>
          {map(BMIAGE_KEYS, (key: any) => {
            const value = player?.bmiAge[key]?.age;
            if (value <= 0) return;
            return (
              <div
                className={clsx(classes.grade, getGradeFromKey(key))}
                key={key}
              >
                <div className={classes.gradeValue}>
                  {Math.round(value * 100)}%
                </div>
                <div className={classes.gradeKey}>{key}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.category}>
        <div className={classes.categoryTitle}>Age + 1 ({player?.age + 1})</div>
        <div>
          {map(BMIAGE_KEYS, (key) => {
            const value = player?.bmiAge[key]?.nextAge;
            if (value <= 0) return null;
            return (
              <div
                className={clsx(classes.grade, getGradeFromKey(key))}
                key={key}
              >
                <div className={classes.gradeValue}>
                  {Math.round(value * 100)}%
                </div>
                <div className={classes.gradeKey}>{key}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.category}>
        <div className={classes.categoryTitle}>
          BMI ({player?.performance.BMI + 1})
        </div>
        {map(BMIAGE_KEYS, (key) => {
          const value = player?.bmiAge[key]?.bmi;
          if (value <= 0) return null;
          return (
            <div
              className={clsx(classes.grade, getGradeFromKey(key))}
              key={key}
            >
              <div className={classes.gradeValue}>
                {Math.round(value * 100)}%
              </div>
              <div className={classes.gradeKey}>{key}</div>
            </div>
          );
        })}
      </div>
      <div className={classes.category}>
        <div className={classes.categoryTitle}>
          <span>PPI</span>
          <div className={classes.autoComp}>
            <Autocomplete
              className={classes.backColor}
              options={seasonOption.map((c: any) => ({
                name: c.name,
                _id: c._id,
              }))}
              classes={{ input: classes.setSize }}
              getOptionLabel={(option: any) => option.name}
              id="auto-complete"
              autoComplete
              value={season ? season : null}
              onChange={onChangeSeason}
              includeInputInList
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  className={classes.textFieldSeason}
                  label="Season"
                  size={8}
                  margin="none"
                />
              )}
            />
          </div>
          <div className={classes.teamSeasonInfor}>
            {player?.seasonTeamData?.team?.name}
            {" - "}
            {player?.seasonTeamData?.season?.name}
          </div>
        </div>
        <div>
          {ppi ? (
            <Bar
              data={{
                labels: map(
                  PPI_CATEGORY_LABEL,
                  (value, category) => PPI_CATEGORY_LABEL[category]
                ),
                datasets: [
                  {
                    label: "Summary",
                    data: map(
                      PPI_CATEGORY_LABEL,
                      (value: any, category: any) => {
                        if (!isEmpty(player)) return ppi?.summary[category];
                      }
                    ).map((o: any) => o * 100),
                    backgroundColor: map(
                      PPI_CATEGORY_LABEL,
                      (value: any, category: any) => {
                        if (!isEmpty(player))
                          return getColor(ppi?.summary[category] * 100);
                      }
                    ),
                    borderWidth: 1,
                  },
                ],
              }}
              type="bar"
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scale: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          ) : (
            <EmptyScreen></EmptyScreen>
          )}
        </div>
      </div>
      <div className={classes.category}>
        <div className={classes.categoryTitle}>Market Value</div>
        <div>
          Current estimation at this position:{" "}
          <b>
            {player?.marketValue
              ? currencyFormatter.format(player?.marketValue, {
                  code: "EUR",
                  decimalDigits: 0,
                  precision: 0,
                })
              : "N/A"}
          </b>
        </div>
      </div>
    </div>
  );
};

export default FootballPanelAdvanced;

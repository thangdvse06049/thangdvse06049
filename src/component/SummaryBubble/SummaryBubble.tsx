import React, { useEffect, useState } from "react";
import { useStyles } from "../SummaryBubble/SummaryBubble.style";
import { Team } from "../../models/team";
import { UserCtx } from "../../context/User";
import { map } from "lodash";
import { TPI_TRANSLATION } from "../../constants/team-tpi";
import classnames from "classnames";

const getColorRank = (v: any) => {
  if (v > 80) {
    return "excellent";
  } else if (v >= 60) {
    return "good";
  } else if (v >= 50) {
    return "average-but-good";
  } else if (v >= 40) {
    return "average-but-bad";
  } else if (v >= 20) {
    return "bad";
  } else {
    return "terrible";
  }
};

export const SummaryBubble = () => {
  const classes = useStyles();
  const { user } = React.useContext<any>(UserCtx);
  const [tpi, setTpi] = useState({} as any);

  const fetchData = async () => {
    const competitions = await Team.getCompetitions();
    const season = await Team.getSeasons();
    const tpiApi = await Team.getTPI(competitions[0]._id, season[0]._id);
    setTpi(tpiApi);
  };

  useEffect(() => {
    fetchData();
  }, [user.teamId, user.seasonId]);
  console.log(tpi);

  return (
    <div className={classes.root}>
      {tpi &&
        map(tpi.summary, (value, key) => {
          const entries = Object.entries(tpi.detailsRanked[key]);

          const values = entries.sort((a: any, b: any) => a[1] - b[1]);

          const strengths = values.slice(0, 2);
          const weaknesses = values.reverse().slice(0, 2);

          console.log(strengths);

          const cateNormalValue: any =
            100 - (tpi.summaryRanked[key] / tpi.nbTeams) * 100;
          const categoryNormalizedValue = parseInt(cateNormalValue, 10);

          return (
            <div className={classes.kpi}>
              <div className={classes.kpiTitle}>{key}</div>
              <div
                className={classnames(
                  classes.kpiRank,
                  getColorRank(categoryNormalizedValue)
                )}
              >
                {Math.round(tpi.summaryRanked[key])}
              </div>
              <div className={classes.kpiConnector}>
                <div className={classes.kpiConnectorCircle} />
              </div>
              <div className={classes.kpiDetails}>
                <div className={classes.kpiDetailsTitle}>Strengths</div>
                {strengths.map((o) => (
                  <div className={classes.kpiDetailsRow}>
                    {TPI_TRANSLATION[key][o[0]] || o[0]}
                  </div>
                ))}
                <div className={classes.kpiDetailsTitle}>Weaknesses</div>
                {weaknesses.map((o) => (
                  <div className={classes.kpiDetailsRow}>
                    {TPI_TRANSLATION[key][o[0]] || o[0]}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SummaryBubble;

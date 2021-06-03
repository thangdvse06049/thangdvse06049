import React, { useEffect, useState } from "react";
import { useStyles } from "../SummaryBubble/SummaryBubble.style";
import { Team } from "../../models/team";
import { UserCtx } from "../../context/User";
import { isEmpty, map, pick, toArray } from "lodash";
import { SENTENCE_SUMMARY, TPI_CATEGORY_LABEL } from "../../constants/team-tpi";
import classnames from "classnames";
import { CircularProgress } from "@material-ui/core";

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
  }, [user?.teamId, user?.seasonId]);

  return (
    <div className={classes.root}>
      {isEmpty(tpi) || !tpi ? (
        <div className={classes.circular}>
          <CircularProgress size={60} />
        </div>
      ) : (
        map(tpi.summary, (value, key) => {
          const fieldList = Object.keys(SENTENCE_SUMMARY);

          const pickField = pick(tpi.detailsRanked[key], fieldList);
          const entries = Object.entries(pickField);
          const values = entries.sort((a: any, b: any) => a[1] - b[1]);

          let strengths: any;
          let weaknesses: any;

          if (values.length === 3) {
            strengths = values.slice(0, 2);
            weaknesses = values.reverse().slice(0, 1);
          } else if (values.length === 2) {
            strengths = values.slice(0, 1);
            weaknesses = values.reverse().slice(0, 1);
          } else if (values.length === 1) {
            strengths = values.slice(0, 1);
            weaknesses = null;
          } else {
            strengths = values.slice(0, 2);
            weaknesses = values.reverse().slice(0, 2);
          }

          const cateNormalValue: any =
            100 - (tpi?.summaryRanked[key] / tpi?.nbTeams) * 100;
          const categoryNormalizedValue = parseInt(cateNormalValue, 10);

          return (
            <div className={classes.kpi}>
              <div className={classes.kpiTitle}>{TPI_CATEGORY_LABEL[key]}</div>
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
                {strengths &&
                  strengths.map((o: any) => (
                    <div className={classes.kpiDetailsRow}>
                      - {toArray(SENTENCE_SUMMARY[o[0]])[0] || o[0]}
                    </div>
                  ))}
                <div className={classes.kpiDetailsTitle}>Weaknesses</div>
                {weaknesses &&
                  weaknesses.map((o: any) => (
                    <div className={classes.kpiDetailsRow}>
                      - {toArray(SENTENCE_SUMMARY[o[0]])[0] || o[0]}
                    </div>
                  ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SummaryBubble;

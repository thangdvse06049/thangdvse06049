import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isEmpty, map } from "lodash";
import {
  TPI,
  TPI_SUMMARY,
  TPI_CATEGORY_LABEL,
  TPI_ORDER_CHART,
} from "../../constants/team-tpi";
import classnames from "classnames";
import { LINK_SENTENCES } from "../../constants/link_sentences";
import { useStyles } from "../TeamAnalytics/TeamAnalytics.style";
import { Team } from "../../models/team";
import { UserCtx } from "../../context/User";

const inverseValue = (category: any, key: any, value: any) =>
  ((category === "DANGER" ||
    category === "RECOVERY" ||
    category === "BALL_LOSSE") &&
    key === null) ||
  (category === "DANGER" &&
    [
      "concededGoals",
      "shotsAgainst",
      "clearances",
      "shotsBlocked",
      "headShotsConfidence",
    ].indexOf(key) !== -1)
    ? 100 - value
    : value;

const getColor = (category: any, key: any, v: any) => {
  if (v > 80) {
    return "#00B0F0";
  } else if (v > 60) {
    return "#00B050";
  } else if (v > 40) {
    return "#7030A0";
  } else if (v > 20) {
    return "#ED7D31";
  } else {
    return "#FF0000";
  }
};

const getAdviceIndex = (category: any, key: any, value: any) => {
  const v = inverseValue(category, key, value);
  const index = Math.floor(v / 20);
  return index === 5 ? 4 : index;
};

const getSentenceIndex = (v: any) => {
  const index = Math.floor(v / 20);
  return index === 5 ? 4 : index;
};

export const TeamAnalytics = () => {
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

  const renderDetailsPanel = () => {
    return (
      <div className={classes.expandDetails}>
        {!isEmpty(tpi) &&
          map(LINK_SENTENCES, (arrayFields, category) => {
            const cateValue: any = tpi.summary[category] * 100;
            const cateNormalValue: any =
              100 - (tpi.summaryRanked[category] * 100) / tpi.nbTeams;

            const categoryValue = parseInt(cateValue, 10);
            const categoryNormalizedValue = parseInt(cateNormalValue, 10);
            return (
              <div className={classes.expandGroup}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    classes={{ content: classes.accordionSummary }}
                  >
                    <div className={classes.secondaryHeading}>
                      <div
                        className={classes.percent}
                        style={{
                          backgroundColor: `${getColor(
                            category,
                            null,
                            categoryNormalizedValue
                          )}`,
                        }}
                      >{`${categoryValue}`}</div>
                    </div>
                    <Typography className={classes.heading}>
                      {TPI_CATEGORY_LABEL[category]}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <div className={classes.categoryAdvice}>
                        {
                          TPI_SUMMARY[category][
                            getAdviceIndex(category, null, categoryValue)
                          ]
                        }
                      </div>
                      <div className={classes.separator} />

                      {map(arrayFields, (fields) => {
                        return (
                          <div className={classes.sentence}>
                            <div className={classes.sentenceTitle}>
                              {fields.join(", ")}
                            </div>
                            <div className={classes.sentenceContent}>
                              {map(fields, (field: any) => {
                                const indexFirst = getSentenceIndex(
                                  (tpi.detailsRanked[category][field] /
                                    tpi.nbTeams) *
                                    100
                                );

                                const index = indexFirst
                                  ? indexFirst
                                  : getSentenceIndex(
                                      tpi.details[category][field] * 100
                                    );
                                return (
                                  <span>
                                    {TPI[category][field]
                                      ? TPI[category][field][index] + " "
                                      : ""}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })}
      </div>
    );
  };

  const renderRadarChart = () => {
    return (
      <Radar
        data={{
          labels: map(
            TPI_ORDER_CHART,
            (value: any, category: any) => TPI_CATEGORY_LABEL[category]
          ),
          datasets: [
            {
              suggestedMax: 100,
              labels: map(
                TPI_ORDER_CHART,
                (value, category) => TPI_CATEGORY_LABEL[category]
              ),
              backgroundColor: "rgba(64,112,244, 0.5)",
              pointBackgroundColor: "#4070F4",
              data: map(TPI_ORDER_CHART, (value: any, category: any) => {
                if (!isEmpty(tpi)) return tpi.summary[category];
              }).map((o: any) => o * 100),
            },
          ],
        }}
        type="radar"
        options={{
          height: 250,
          legend: {
            position: "top",
            display: false,
          },
          scale: {
            reverse: false,
            gridLines: {
              color: "#3D3D3D",
            },
            ticks: {
              beginAtZero: true,
              suggestedMax: 100,
            },
          },
        }}
      />
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.analyticPanel}>
        <div className={classes.radarChart}>{renderRadarChart()}</div>
        <div className={classes.details}>
          <div className={classes.chartLegend}>
            <div className={classes.chartItemLegend}>
              <div
                className={classnames(classes.chartItemLegendBadge, "very-bad")}
              />
              <div className={classes.chartItemLegendText}>Faiblesse</div>
            </div>
            <div className={classes.chartItemLegend}>
              <div
                className={classnames(classes.chartItemLegendBadge, "bad")}
              />
              <div className={classes.chartItemLegendText}>Mauvais</div>
            </div>
            <div className={classes.chartItemLegend}>
              <div
                className={classnames(classes.chartItemLegendBadge, "normal")}
              />
              <div className={classes.chartItemLegendText}>Moyen</div>
            </div>
            <div className={classes.chartItemLegend}>
              <div
                className={classnames(classes.chartItemLegendBadge, "good")}
              />
              <div className={classes.chartItemLegendText}>Bon</div>
            </div>
            <div className={classes.chartItemLegend}>
              <div
                className={classnames(
                  classes.chartItemLegendBadge,
                  "very-good"
                )}
              />
              <div className={classes.chartItemLegendText}>Excellent</div>
            </div>
            <div className={classes.chartItemNote}>
              {/* Based on others teams results */}
            </div>
          </div>
          {renderDetailsPanel()}
        </div>
      </div>
    </div>
  );
};

export default TeamAnalytics;
import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { find, forEach, isEmpty, kebabCase, map, mean, values } from "lodash";
import {
  TPI,
  TPI_SUMMARY,
  TPI_CATEGORY_LABEL,
  TPI_ORDER_CHART,
  TPI_TRANSLATION,
} from "../../constants/team-tpi";
import classnames from "classnames";
import { LINK_SENTENCES } from "../../constants/link_sentences";
import { useStyles } from "../TeamAnalytics/TeamAnalytics.style";
import { Team } from "../../models/team";
import { UserCtx } from "../../context/User";
import SummaryBubble from "../SummaryBubble/SummaryBubble";
import { Player } from "../../models/player";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import { Season } from "../../models/season";

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
    return "#4BAEEA";
  } else if (v >= 60) {
    return "#4BAC5B";
  } else if (v >= 50) {
    return "#68369A";
  } else if (v >= 40) {
    return "#726284";
  } else if (v >= 20) {
    return "#DF8244";
  } else {
    return "#EC3323";
  }
};

const getAdviceIndex = (category: any, key: any, value: any) => {
  if (value >= 80) return 0;
  if (value >= 60) return 1;
  if (value >= 50) return 2;
  if (value >= 40) return 3;
  if (value >= 20) return 4;
  return 5;
};

const getSentenceIndex = (value: any) => {
  if (value >= 80) return 0;
  if (value >= 60) return 1;
  if (value >= 50) return 2;
  if (value >= 40) return 3;
  if (value >= 20) return 4;
  return 5;
};

export const TeamAnalytics = () => {
  const classes = useStyles();
  const { user } = React.useContext<any>(UserCtx);

  const [topWorstPlayer, setTopWorstPlayer] = React.useState<any>();
  const [tpi, setTpi] = useState({} as any);
  const [tpiSeasonCompare, setTpiSeasonCompare] = useState({} as any);
  const [seasonToCompare, setSeasonToCompare] = useState<any>();
  const [seasonOption, setSeasonOption] = useState<any>([]);

  const avgSummaryTpi = mean(values(tpi?.summary)) || 0;

  const onChangeSeason = (event: any, option: any) => {
    setSeasonToCompare(option);
  };

  const fetchData = async () => {
    const competitions = await Team.getCompetitions();
    const season = await Team.getSeasons();
    const tpiApi = await Team.getTPI(competitions[0]._id, season[0]._id);
    setTpi(tpiApi);
  };

  const getTop3WorstPlayerOfEachCate = (tpiToPpi: any) => {
    const dataObj: any = {};
    forEach(tpiToPpi?.tpiCategories, (details: any, category: any) => {
      const res = details.players.slice(0, 3);
      dataObj[category] = dataObj[category] || [];
      dataObj[category].push(res);
    });
    return dataObj;
  };

  const getDataOfTop3Player = async (top3PlayerWithCate: any) => {
    const playerInfor = await Player.getPlayerData(top3PlayerWithCate);
    setTopWorstPlayer(playerInfor);
  };

  useEffect(() => {
    Team.getTpiToPPi()
      .then((data) => {
        const objData = getTop3WorstPlayerOfEachCate(data);
        getDataOfTop3Player(objData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user.teamId, user.seasonId]);

  useEffect(() => {
    fetchData();
  }, [user.teamId, user.seasonId]);

  useEffect(() => {
    fetchTpiSeasonToCompare();
  }, [seasonToCompare]);

  useEffect(() => {
    fetchSeason();
  }, []);

  const fetchTpiSeasonToCompare = async () => {
    const competitions = await Team.getCompetitions();
    const tpiSeasonToCompare = await Team.getTPI(
      competitions[0]._id,
      seasonToCompare?._id
    );
    setTpiSeasonCompare(tpiSeasonToCompare);
  };

  const fetchSeason = async () => {
    const resSeason = await Season.getListSeasonByCompetitionId();
    const season = find(resSeason, { _id: user.seasonId });
    setSeasonOption(resSeason);
    setSeasonToCompare(season);
  };

  const renderListPlayer = (category: any) => {
    return (
      <div className={classes.listWorstPlayer}>
        {map(topWorstPlayer[category], (o: any) => (
          <div className={classes.playerBottom}>
            <div
              className={classes.playerAvatar}
              style={{
                backgroundImage: `url(${
                  o?.player?.imageDataURL || "https://via.placeholder.com/150"
                })`,
              }}
            />
            <div className={classes.playerName}>{o?.player.shortName}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderDetailsPanel = () => {
    return (
      <div className={classes.expandDetails}>
        {!isEmpty(tpi) &&
          map(LINK_SENTENCES, (arrayFields, category) => {
            const cateValue: any = tpi.summary[category] * 100;
            const cateNormalValue: any =
              100 - (tpi.summaryRanked[category] / tpi.nbTeams) * 100;

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
                    {topWorstPlayer && renderListPlayer(category)}
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <div className={classes.categoryAdvice}>
                        {
                          TPI_SUMMARY[category][
                            getAdviceIndex(
                              category,
                              null,
                              categoryNormalizedValue
                            )
                          ]
                        }
                      </div>
                      <div className={classes.separator} />

                      {map(arrayFields, (fields: string[], key: string) => {
                        return (
                          <div className={classes.sentence}>
                            <div className={classes.sentenceTitle}>
                              {TPI_TRANSLATION[category][key]}
                            </div>
                            <div className={classes.sentenceContent}>
                              <span>
                                {map(fields, (field: any, idx: number) => {
                                  const index = getSentenceIndex(
                                    100 -
                                      (tpi.detailsRanked[category][field] /
                                        tpi.nbTeams) *
                                        100
                                  );
                                  return TPI[category][field]
                                    ? TPI[category][field][index]
                                    : "";
                                }).join(" et ")}
                              </span>
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
              label: `${tpi?.name}`,
              suggestedMax: 100,
              backgroundColor: "rgba(64,112,244, 0.5)",
              pointBackgroundColor: "#4070F4",
              data: map(TPI_ORDER_CHART, (value: any, category: any) => {
                if (!isEmpty(tpi)) return tpi.summary[category];
              }).map((o: any) => o * 100),
            },
            {
              label: `${tpiSeasonCompare?.name}`,
              suggestedMax: 100,
              backgroundColor: "rgba(111,33,94, 0.5)",
              pointBackgroundColor: "#e4bd26",
              data: map(TPI_ORDER_CHART, (value: any, category: any) => {
                if (!isEmpty(tpiSeasonCompare))
                  return tpiSeasonCompare?.summary[category];
              }).map((o: any) => o * 100),
            },
          ],
        }}
        type="radar"
        options={{
          height: 250,
          plugins: {},
          scale: {
            pointLabels: {
              fontSize: 200,
              fontColor: "#ff0000",
            },
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
      <SummaryBubble></SummaryBubble>
      <div className={classes.analyticPanel}>
        <div className={classes.radarChart}>
          <div className={classes.chartHeader}>
            <div className={classes.autoCompleteSeason}>
              <Autocomplete
                className={classes.backColor}
                options={seasonOption.map((c: any) => ({
                  name: c.name,
                  _id: c._id,
                }))}
                getOptionLabel={(option: any) => option.name}
                id="auto-complete"
                autoComplete
                value={seasonToCompare ? seasonToCompare : null}
                onChange={onChangeSeason}
                includeInputInList
                renderInput={(params: any) => (
                  <TextField {...params} label="Season" margin="none" />
                )}
              />
            </div>
            <div className={classes.avgTpi}>
              Average Tpi: {avgSummaryTpi.toFixed(4)}
            </div>
          </div>
          {tpi && tpiSeasonCompare ? (
            renderRadarChart()
          ) : (
            <span className={classes.noDataNoti}>No data</span>
          )}
        </div>
        <div className={classes.details}>
          <div className={classes.chartLegend}>
            <div className={classes.chartItemLegend}>
              <div
                className={classnames(
                  classes.chartItemLegendBadge,
                  kebabCase("terrible")
                )}
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
                className={classnames(
                  classes.chartItemLegendBadge,
                  kebabCase("average but bad")
                )}
              />
              <div className={classes.chartItemLegendText}>Average</div>
            </div>
            <div className={classes.chartItemLegend}>
              <div
                className={classnames(
                  classes.chartItemLegendBadge,
                  kebabCase("average but good")
                )}
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
                  kebabCase("very good")
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

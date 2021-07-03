import React, { useEffect } from "react";
import { useStyles } from "./FootballPanelSuggestion.style";
import clsx from "classnames";
import { FootballFieldCtx } from "../../context/FootballField";
import { capitalize, map, isNumber, kebabCase, sortBy, filter } from "lodash";
import { Team } from "../../models/team";
import { CircularProgress } from "@material-ui/core";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Collapse } from "react-collapse";
import { LINK, TRANSLATION } from "../../constants/footballGeneral";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const FootballPanelSuggestion = () => {
  const classes = useStyles();
  const { player, formation, rank } = React.useContext<any>(FootballFieldCtx);

  const [suggestions, setSuggestions] = React.useState(null as any);
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const getGrade = (value: number) => {
    if (!isNumber(value)) return "error";
    if (value > 0.8) {
      return "excellent";
    } else if (value >= 0.6) {
      return "good";
    } else if (value >= 0.5) {
      return "average but good";
    } else if (value >= 0.4) {
      return "average but bad";
    } else if (value >= 0.2) {
      return "bad";
    } else {
      return "terrible";
    }
  };

  const renderCategoryHeader = (category: string, ppi: any) => {
    return (
      <div
        onClick={() => setExpanded(category === expanded ? null : category)}
        className={clsx(classes.categoryHeader, {
          expanded: expanded === category,
        })}
      >
        <div className={classes.categoryInnerHeader}>
          <div
            className={clsx(
              classes.grade,
              kebabCase(getGrade(ppi?.summary[category]))
            )}
          >
            {getGrade(ppi?.summary[category])}
          </div>
          <div className={classes.categoryTitle}>{category}</div>
        </div>
        <ArrowDropDownIcon className={classes.arrow} />
      </div>
    );
  };

  const renderDetails = (category: string, details: any, ppi: any) => {
    return (
      <Collapse isOpened={expanded === category} key={category}>
        <div
          className={clsx(classes.categoryContent, {
            expanded: expanded === category,
          })}
        >
          {map(details, ([value], key: any) => {
            if (value.includes(".")) {
              const [group, subName] = value.split(".");
              return (
                <div className={classes.contentRow}>
                  <div className={classes.contentValue}>
                    <div className={classes.contentKey}>
                      {TRANSLATION[key] || key}
                    </div>

                    <div>
                      <div
                        className={clsx(
                          classes.grade,
                          getGrade(
                            player?.ppi?.detailsRanked[category][`_${group}`][
                              subName
                            ]
                          )
                        )}
                      >
                        {getGrade(
                          player?.ppi?.detailsRanked[category][`_${group}`][
                            subName
                          ]
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className={classes.contentRow}>
                  <div className={classes.contentValue}>
                    <div className={classes.contentKey}>
                      {TRANSLATION[key] || key}
                    </div>
                    <div>
                      <div
                        className={clsx(
                          classes.grade,
                          getGrade(ppi?.detailsRanked[category][key])
                        )}
                      >
                        {getGrade(ppi?.detailsRanked[category][key])}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </Collapse>
    );
  };

  const detailPPI = (ppi: any, i: number) => {
    return (
      <div className={classes.detailPPIList}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={clsx(classes.accordionSum, { grey: i % 2 === 0 })}
          >
            <div className={classes.itemContent}>
              <Typography className={classes.heading}>PPI details:</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails
            className={clsx(classes.accordionDetail, { grey: i % 2 === 0 })}
          >
            <Typography>
              {map(LINK, (details: any, category: string) => {
                return (
                  <div className={classes.category}>
                    {renderCategoryHeader(category, ppi)}
                    {renderDetails(category, details, ppi)}
                    <div className={classes.categoryContent}> </div>
                  </div>
                );
              })}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };

  const sortHaveUnknownPrice = (players: any) => {
    const listUnknown = filter(players, (p) => p.pricePlayer === "Unknown");
    const listNotUnknown = filter(players, (p) => p.pricePlayer !== "Unknown");
    const sortByPrice = sortBy(listNotUnknown, "pricePlayer").reverse();
    return sortByPrice.concat(listUnknown);
  };

  const formatMoney = (money: any) => {
    try {
      return money?.toFixed(0).replace(/./g, function (c: any, i: any, a: any) {
        return i > 0 && c !== " " && (a.length - i) % 3 === 0 ? " " + c : c;
      });
    } catch (e) {
      return money;
    }
  };

  useEffect(() => {
    if (formation.scheme) {
      setSuggestions(null);
      Team.getPositionSuggestions(
        player.playerId,
        player?.position,
        parseInt(rank, 10)
      )
        .then((data) => {
          const sortByPrice = sortHaveUnknownPrice(data);
          setSuggestions(sortByPrice);
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
      {suggestions === null ? (
        <div className={classes.circular}>
          <CircularProgress />
        </div>
      ) : (
        map(suggestions, (player: any, i: number) => {
          const getTeamName = (player: any) => {
            if (player?.teamCategory) {
              return `${player?.teamCategory} (${player?.team?.officialName})`;
            } else {
              return `Unknown (${player?.team?.officialName || "Unknown"})`;
            }
          };

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
                  {capitalize(player?.player?.birthArea?.name) || "Unknown"})
                </div>
                <div>
                  Competition: {capitalize(player?.competitionCountry)}
                  {", "}
                  {capitalize(player?.competitionCategoryByUsersSeason)}
                </div>
                <div>Team: {getTeamName(player)}</div>
                <div>
                  PPI: {capitalize(player?.ppi)} (
                  {Math.floor(player?.gradeScore)})
                </div>
                <div>
                  Status: {capitalize(player?.progression)} ({player?.age})
                </div>
                <div>Matches In Start: {player?.matchesInStart || 0}</div>
                <div>
                  Matches Substituted: {player?.matchesSubstituted || 0}
                </div>
                <div>Minutes On Field: {player?.minutesOnField || 0}</div>
                {player?.pricePlayer ? (
                  <div>Price: {formatMoney(player?.pricePlayer)} €</div>
                ) : (
                  "Unknown"
                )}
                <div>{detailPPI(player, i)}</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default FootballPanelSuggestion;

import React, { useEffect } from "react";
import { useStyles } from "./FootballPanelSuggestion.style";
import clsx from "classnames";
import { FootballFieldCtx } from "../../context/FootballField";
import { capitalize, map, isNumber, kebabCase } from "lodash";
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
              kebabCase(getGrade(ppi?.summaryRanked[category]))
            )}
          >
            {getGrade(ppi?.summaryRanked[category])}
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

      {suggestions === null ? (
        <div className={classes.circular}>
          <CircularProgress />
        </div>
      ) : (
        map(suggestions, (player: any, i: number) => {
          const getTeamName = (player: any) => {
            if (player?.teamCategory) {
              return `${player?.teamCategory} (${player?.team?.name})`;
            } else {
              return `UnKnown (${player?.team?.name})`;
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
                  {capitalize(player?.player?.passportArea?.name) || "Unknown"})
                </div>
                <div>
                  Competition: {capitalize(player?.competitionCountry)}
                  {", "}
                  {capitalize(player?.competitionCategory)}
                </div>
                <div>Team: {getTeamName(player)}</div>
                <div>
                  PPI: {capitalize(player?.ppi)} (
                  {Math.floor(player?.gradeScore)})
                </div>
                <div>
                  Status: {capitalize(player?.progression)} ({player?.age})
                </div>
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

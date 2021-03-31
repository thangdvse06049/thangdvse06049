import React, { useEffect } from "react";
import { useStyles } from "./FootballPanelGeneral.style";
import { map, startsWith } from "lodash";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import clsx from "classnames";
import { Collapse } from "react-collapse";
import { FootballFieldCtx } from "../../context/FootballField";
import { LINK, SENTENCES, TRANSLATION } from "../../constants/footballGeneral";

let links: any, sentences: any, translations: any;

const getGrade = (value: number) => {
  if (value > 0.8) {
    return "excellent";
  } else if (value >= 0.6) {
    return "good";
  } else if (value >= 0.5) {
    return "average";
  } else if (value >= 0.4) {
    return "ok";
  } else if (value >= 0.2) {
    return "bad";
  } else {
    return "terrible";
  }
};

const getSentence = (field: any, value: any) => {
  try {
    let index: number;
    if (value > 0.8) return "Excellent";
    else if (value > 0.6) return "Good";
    else if (value > 0.5) return "Average but good";
    else if (value > 0.4) return "Average but bad";
    else if (value > 0.2) return "Bad";
    else return "Mediocre";
  } catch (e) {
    return `error_${field}`;
  }
};

export const FootballPanelGeneral = () => {
  links = LINK;
  sentences = SENTENCES;
  translations = TRANSLATION;
  const classes = useStyles();

  const { formation, player } = React.useContext<any>(FootballFieldCtx);
  const [expanded, setExpanded] = React.useState<string | null>(null);

  useEffect(() => {
    setExpanded(Object.keys(formation.players[0].ppi.details)[0]);
  }, [formation]);

  const renderCategoryHeader = (category: string) => {
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
              getGrade(player.ppi.summary[category])
            )}
          >
            {getGrade(player.ppi.summary[category])}
          </div>
          <div className={classes.categoryTitle}>{category}</div>
        </div>
        <ArrowDropDownIcon className={classes.arrow} />
      </div>
    );
  };

  const renderDetails = (category: string, details: any) => {
    return (
      <Collapse isOpened={expanded === category} key={category}>
        <div
          className={clsx(classes.categoryContent, {
            expanded: expanded === category,
          })}
        >
          {map(details, ([value], key) => {
            return (
              <div className={classes.contentRow}>
                <div className={classes.contentValue}>
                  <div className={classes.contentKey}>
                    {translations[key] || key}
                  </div>
                  <div
                    className={clsx(
                      classes.grade,
                      getGrade(player.ppi.details[category][key])
                    )}
                  >
                    {getGrade(player.ppi.details[category][key])}
                  </div>
                </div>
                <div>
                  {getSentence(value, player.ppi.details[category][key])}
                </div>
              </div>
            );
          })}
        </div>
      </Collapse>
    );
  };

  return (
    <div className={classes.root}>
      {map(links, (details: any, category: string) => {
        return (
          <div className={classes.category}>
            {renderCategoryHeader(category)}
            {renderDetails(category, details)}
            <div className={classes.categoryContent}> </div>
          </div>
        );
      })}
    </div>
  );
};

export default FootballPanelGeneral;

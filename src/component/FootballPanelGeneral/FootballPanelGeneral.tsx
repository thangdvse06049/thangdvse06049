import React, { useEffect } from "react";
import { useStyles } from "./FootballPanelGeneral.style";
import { isNumber, kebabCase, map } from "lodash";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import clsx from "classnames";
import { Collapse } from "react-collapse";
import { FootballFieldCtx } from "../../context/FootballField";
import { LINK } from "../../constants/footballGeneral";

let links: any;

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

export const FootballPanelGeneral = () => {
  links = LINK;
  const classes = useStyles();

  const { formation, player } = React.useContext<any>(FootballFieldCtx);
  const [expanded, setExpanded] = React.useState<string | null>(null);

  useEffect(() => {
    if (formation?.players?.length) {
      setExpanded(Object.keys(formation?.players[0].ppi?.details)[0]);
    }
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
          <div className={classes.categoryTitle}>{category}</div>

          <div
            className={clsx(
              classes.grade,
              kebabCase(getGrade(player?.ppi?.summaryRanked[category]))
            )}
          >
            {getGrade(player?.ppi?.summaryRanked[category])}
          </div>
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
                  <div className={classes.contentKey}>{key}</div>
                  <div>
                    <div
                      className={clsx(
                        classes.grade,
                        getGrade(player?.ppi?.detailsRanked[category][key])
                      )}
                    >
                      {getGrade(player?.ppi?.detailsRanked[category][key])}
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

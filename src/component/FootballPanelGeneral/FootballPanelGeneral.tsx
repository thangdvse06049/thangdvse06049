import React, { useEffect } from "react";
import { useStyles } from "./FootballPanelGeneral.style";
import { isNumber, map } from "lodash";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import clsx from "classnames";
import { Collapse } from "react-collapse";
import { FootballFieldCtx } from "../../context/FootballField";
import {
  getGroupPosition,
  LINK,
  PONDERATION,
  TRANSLATION,
} from "../../constants/footballGeneral";
import StarIcon from "@material-ui/icons/Star";
import { yellow } from "@material-ui/core/colors";

let links: any;

const getGrade = (value: number) => {
  if (!isNumber(value)) return "error";

  if (value > 0.8) {
    return "Excellent";
  } else if (value >= 0.6) {
    return "Bon";
  } else if (value >= 0.5) {
    return "Acceptable";
  } else if (value >= 0.4) {
    return "Pénalisant";
  } else if (value >= 0.2) {
    return "Mauvais";
  } else {
    return "Terrible";
  }
};

export const FootballPanelGeneral = () => {
  links = LINK;
  const classes = useStyles();

  const { formation, player } = React.useContext<any>(FootballFieldCtx);
  const [expanded, setExpanded] = React.useState<string | null>(null);

  useEffect(() => {
    if (formation?.players?.length) {
      setExpanded(Object.keys(formation?.players?.[0]?.ppi?.details)[0]);
    }
  }, [formation]);

  const renderCategoryHeader = (category: string) => {
    const playerGroupPosition = getGroupPosition(player.position);

    return (
      <div
        onClick={() => setExpanded(category === expanded ? null : category)}
        className={clsx(classes.categoryHeader, {
          expanded: expanded === category,
        })}
      >
        <div className={classes.categoryInnerHeader}>
          {map(PONDERATION, (cateObj: any, groupPosition: any) => {
            if (groupPosition === playerGroupPosition) {
              if (cateObj[category] !== 0) {
                return (
                  <>
                    <StarIcon style={{ color: yellow[800] }}></StarIcon>
                    <div className={classes.categoryTitle}>{category}</div>
                  </>
                );
              } else {
                return (
                  <div className={classes.categoryTitleNotStar}>{category}</div>
                );
              }
            }
          })}
          <div
            className={clsx(
              classes.grade,
              getGrade(player?.ppi?.summary[category])
            )}
          >
            {getGrade(player?.ppi?.summary[category])}
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
                            player?.ppi?.details[category][`_${group}`][subName]
                          )
                        )}
                      >
                        {getGrade(
                          player?.ppi?.details[category][`_${group}`][subName]
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
                          getGrade(player?.ppi?.details?.[category][key])
                        )}
                      >
                        {getGrade(player?.ppi?.details?.[category][key])}
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

  return (
    <div className={classes.root}>
      {player?.ppi ? (
        map(links, (details: any, category: string) => {
          return (
            <div className={classes.category}>
              {renderCategoryHeader(category)}
              {renderDetails(category, details)}
              <div className={classes.categoryContent}> </div>
            </div>
          );
        })
      ) : (
        <div className={classes.noData}>No data for PPI</div>
      )}
    </div>
  );
};

export default FootballPanelGeneral;

import React, { useEffect } from "react";
import { useStyles } from "./FootballPanelGeneral.style";
import { filter, isNumber, kebabCase, keys, map, flattenDeep } from "lodash";
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
      setExpanded(Object.keys(formation?.players[0].ppi?.details)[0]);
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
              getGrade(player?.ppi?.summaryRanked[category])
            )}
          >
            {getGrade(player?.ppi?.summaryRanked[category])}
          </div>
        </div>
        <ArrowDropDownIcon className={classes.arrow} />
      </div>
    );
  };

  const getFullDetailPossession = (category: string) => {
    const allKeys = keys(player?.ppi?.detailsRanked[category]);
    const missingKeys = filter(allKeys, (o: any) => o.includes("_"));
    const dataByMissingKeys = map(missingKeys, (key: string) => {
      const dataByKey = player?.ppi?.detailsRanked[category][key];
      return dataByKey;
    });

    return dataByMissingKeys;
  };

  let _data: any;

  const renderDetails = (category: string, details: any) => {
    if (category === "POSSESSION") {
      const dataByMissingKeys = getFullDetailPossession(category);
      _data =
        dataByMissingKeys.length > 0
          ? Object.assign(dataByMissingKeys[0], dataByMissingKeys[1])
          : null;
    }
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
                    {TRANSLATION[key] || key}
                  </div>
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
          {map(_data, (subValue, subKey) => (
            <div className={classes.contentRow}>
              <div className={classes.contentValue}>
                <div className={classes.contentKey}>
                  {TRANSLATION[subKey] || subKey}
                </div>
                <div>
                  <div className={clsx(classes.grade, getGrade(subValue))}>
                    {getGrade(subValue)}
                  </div>
                </div>
              </div>
            </div>
          ))}
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

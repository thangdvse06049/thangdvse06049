import React from "react";
import { useStyles } from "./FootballPanelGeneral.style";
import { map } from "lodash";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import clsx from "classnames";
import { Collapse } from "react-collapse";

const FAKE_JSON = `{"playerId":102,"playerName":"Marcelo","playerFullName":"Marcelo Antônio Guedes Filho","teamName":"Olympique Lyonnais","positions":["rcb","cb"],"detailsRanked":{"x":{"x":0.27086614173228346},"y":{"y":0.06771653543307087},"DefenseursCentraux":{"positiveCB":0.0015748031496062992,"OffensiveLBRB":0.0015748031496062992},"DefenseurLateraux":{"OffensiveLBRB":0.0015748031496062992,"DefensiveLBRB":0.0015748031496062992},"MilieuxDefensif":{"OffensiveDMF":0.0015748031496062992,"DefensiveDMF":0.0015748031496062992},"MilieuxRelayeur":{"OffensiveLCMFRCMF":0.0015748031496062992,"DefensiveLCMFRCMF":0.0015748031496062992},"MilieuxOffensif":{"OffensiveAMF":0.0015748031496062992},"Ailliers":{"OffensiveLAMFRAMF":0.0015748031496062992,"DefensiveLAMFRAMF":0.0015748031496062992},"Attaquants":{"OffensiveCF":0.0015748031496062992},"Gardiens":{"Gk":0.0015748031496062992},"Test":{"OffensiveCF":0.0015748031496062992}},"details":{"DefenseursCentraux":{"positiveCB":0,"OffensiveLBRB":0},"DefenseurLateraux":{"OffensiveLBRB":0,"DefensiveLBRB":0},"MilieuxDefensif":{"OffensiveDMF":0,"DefensiveDMF":0},"MilieuxRelayeur":{"OffensiveLCMFRCMF":0,"DefensiveLCMFRCMF":0},"MilieuxOffensif":{"OffensiveAMF":0},"Ailliers":{"OffensiveLAMFRAMF":0,"DefensiveLAMFRAMF":0},"Attaquants":{"OffensiveCF":0},"Gardiens":{"Gk":0},"Test":{"OffensiveCF":0}},"summary":{"x":0.30467023400153254,"y":1,"DefenseursCentraux":0,"DefenseurLateraux":0,"MilieuxDefensif":0,"MilieuxRelayeur":0,"MilieuxOffensif":0,"Ailliers":0,"Attaquants":0,"Gardiens":0,"Test":0},"summaryRanked":{"x":0.27086614173228346,"y":0.06771653543307087,"DefenseursCentraux":0.0015748031496062992,"DefenseurLateraux":0.0015748031496062992,"MilieuxDefensif":0.0015748031496062992,"MilieuxRelayeur":0.0015748031496062992,"MilieuxOffensif":0.0015748031496062992,"Ailliers":0.0015748031496062992,"Attaquants":0.0015748031496062992,"Gardiens":0.0015748031496062992,"Test":0.0015748031496062992}}`;
const FAKE = JSON.parse(FAKE_JSON);

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

export const FootballPanelGeneral = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(
    Object.keys(FAKE.details)[0] as string | null
  );

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
            className={clsx(classes.grade, getGrade(FAKE.summary[category]))}
          >
            {getGrade(FAKE.summary[category])}
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
          {map(Object.keys(details), (key) => {
            return (
              <div className={classes.contentRow}>
                <div className={classes.contentKey}>{key}</div>
                <div
                  className={clsx(classes.grade, getGrade(FAKE.details[key]))}
                >
                  {getGrade(FAKE.details[key])}
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
      {map(FAKE.details, (details: any, category: string) => {
        return (
          <div className={classes.category}>
            {renderCategoryHeader(category)}
            {renderDetails(category, details)}
            {/* <div className={classes.categoryContent}>{'123'}</div> */}
          </div>
        );
      })}
    </div>
  );
};

export default FootballPanelGeneral;

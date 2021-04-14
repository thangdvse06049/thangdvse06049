import React from "react";
import { map } from "lodash";
import { useStyles } from "./FootballPanelAdvanced.style";
import clsx from "classnames";
import { FootballFieldCtx } from "../../context/FootballField";
const currencyFormatter = require("currency-formatter");

const BMIAGE_KEYS = [
  "Average but bad",
  "Average but good",
  "Bad",
  "Excellent",
  "Good",
  "Terrible",
];

const getGradeFromKey = (key: string) => {
  switch (key) {
    case "Excellent":
      return "excellent";
    case "Good":
      return "good";
    case "Average but good":
      return "ok";
    case "Average but bad":
      return "average";
    case "Bad":
      return "bad";
    case "Terrible":
      return "terrible";
  }
};

export const FootballPanelAdvanced = () => {
  const classes = useStyles();
  const { player } = React.useContext<any>(FootballFieldCtx);

  return (
    <div className={classes.root}>
      <div className={classes.category}>
        <div className={classes.categoryTitle}>
          Age ({player?.performance?.age})
        </div>
        <div>
          {map(BMIAGE_KEYS, (key) => {
            const value = player.bmiAge[key].age;
            if (value <= 0) return null;
            return (
              <div
                className={clsx(classes.grade, getGradeFromKey(key))}
                key={key}
              >
                <div className={classes.gradeValue}>
                  {Math.round(value * 100)}%
                </div>
                <div className={classes.gradeKey}>{key}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.category}>
        <div className={classes.categoryTitle}>
          Age + 1 ({player.performance.age + 1})
        </div>
        <div>
          {map(BMIAGE_KEYS, (key) => {
            const value = player.bmiAge[key].nextAge;
            if (value <= 0) return null;
            return (
              <div
                className={clsx(classes.grade, getGradeFromKey(key))}
                key={key}
              >
                <div className={classes.gradeValue}>
                  {Math.round(value * 100)}%
                </div>
                <div className={classes.gradeKey}>{key}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.category}>
        <div className={classes.categoryTitle}>
          BMI ({player.performance.BMI + 1})
        </div>
        {map(BMIAGE_KEYS, (key) => {
          const value = player.bmiAge[key].bmi;
          if (value <= 0) return null;
          return (
            <div
              className={clsx(classes.grade, getGradeFromKey(key))}
              key={key}
            >
              <div className={classes.gradeValue}>
                {Math.round(value * 100)}%
              </div>
              <div className={classes.gradeKey}>{key}</div>
            </div>
          );
        })}
      </div>
      <div className={classes.category}>
        <div className={classes.categoryTitle}>Market Value</div>
        <div>
          Current estimation at this position:{" "}
          <b>
            {player.marketValue
              ? currencyFormatter.format(player.marketValue, {
                  code: "EUR",
                  decimalDigits: 0,
                  precision: 0,
                })
              : "N/A"}
          </b>
        </div>
      </div>
    </div>
  );
};

export default FootballPanelAdvanced;

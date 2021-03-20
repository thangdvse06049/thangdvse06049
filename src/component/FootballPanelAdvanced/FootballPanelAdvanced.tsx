import { Typography } from "@material-ui/core";
import { map } from "lodash";
import React from "react";
import { useStyles } from "./FootballPanelAdvanced.style";
import clsx from "classnames";
const currencyFormatter = require("currency-formatter");

const AGE = {
  excellent: 0.2,
  good: 0,
  ok: 0.1,
  average: 0.5,
  bad: 0.1,
  terrible: 0.1,
};

const BMI = {
  excellent: 0.3,
  good: 0.1,
  ok: 0.1,
  average: 0.3,
  bad: 0.2,
  terrible: 0,
};

const MARKET_VALUE = 500000;

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

export const FootballPanelAdvanced = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.category}>
        <div className={classes.categoryTitle}>Age</div>
        <div>
          {map(AGE, (value, key) => {
            if (value <= 0) return null;
            return (
              <div className={clsx(classes.grade, key)}>
                <div className={classes.gradeValue}>{value * 100}%</div>
                <div className={classes.gradeKey}>{key}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.category}>
        <div className={classes.categoryTitle}>BMI</div>
        {map(BMI, (value, key) => {
          if (value <= 0) return null;
          return (
            <div className={clsx(classes.grade, key)}>
              <div className={classes.gradeValue}>{value * 100}%</div>
              <div className={classes.gradeKey}>{key}</div>
            </div>
          );
        })}
      </div>
      <div className={classes.category}>
        <div className={classes.categoryTitle}>Market Value</div>
        <div>
          Current estimation at this position:{" "}
          <b>{currencyFormatter.format(MARKET_VALUE, { code: "EUR" })}</b>
        </div>
      </div>
    </div>
  );
};

export default FootballPanelAdvanced;

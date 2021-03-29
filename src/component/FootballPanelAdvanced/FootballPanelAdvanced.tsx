import React from "react";
import { map } from "lodash";
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
              <div className={clsx(classes.grade, key)} key={key}>
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
            <div className={clsx(classes.grade, key)} key={key}>
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
          <b>
            {currencyFormatter.format(MARKET_VALUE, {
              code: "EUR",
              decimalDigits: 0,
              precision: 0,
            })}
          </b>
        </div>
      </div>
    </div>
  );
};

export default FootballPanelAdvanced;

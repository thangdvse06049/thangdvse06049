/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useStyles } from "./FootballFieldBalance.style";
import FootballFieldImg from "./assets/football-field.png";
import { Team } from "../../models/team";

const BalanceArrowSVG = (width: any, leftValue: any, rightValue: any) => {
  return (
    <svg height="80" width={"100%"}>
      <path
        d={`M${(width * leftValue) / 100} 40 L${
          ((width * leftValue) / 100) * 0.85
        } 80 L${((width * leftValue) / 100) * 0.85} 60 L0 60 L0 20 L${
          ((width * leftValue) / 100) * 0.85
        } 20 L${((width * leftValue) / 100) * 0.85} 0 Z`}
        fill="#FFCB3A"
      />
      <path
        d={`M${width - (width * rightValue) / 100} 40 L${
          width - ((width * rightValue) / 100) * 0.85
        } 80 L${
          width - ((width * rightValue) / 100) * 0.85
        } 60 L400 60 L400 20 L${
          width - ((width * rightValue) / 100) * 0.85
        } 20 L${width - ((width * rightValue) / 100) * 0.85} 0 Z`}
        fill="#FFCB3A"
      />
      <text
        x="25%"
        y="50%"
        font-weight="bold"
        font-family="SVN-Gilroy"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="white"
      >
        {leftValue.toFixed(0)}%
      </text>
      <text
        x="75%"
        y="50%"
        font-weight="bold"
        font-family="SVN-Gilroy"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="white"
      >
        {rightValue.toFixed(0)}%
      </text>
    </svg>
  );
};

const ArrowSvg = (height: any, value: any) => {
  height = height || 200;

  return (
    <svg height={height} width="80">
      <path
        d={`M40 0 L80 ${height * 0.15} L60 ${
          height * 0.15
        } L60 ${height} L20 ${height} L20 ${height * 0.15} L0 ${
          height * 0.15
        } Z`}
        fill="#FFCB3A"
      />
      <text
        x="50%"
        y="50%"
        font-weight="bold"
        font-family="SVN-Gilroy"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="white"
      >
        {value.toFixed(0)}%
      </text>
    </svg>
  );
};

const ArrowSvgDefensive = (height: any, value: any) => {
  height = height || 200;
  console.log(height);

  return (
    <svg height={height} width="80">
      <path
        d={`M40 0
            L80 ${height * 0.15}
            L60 ${height * 0.15}
            
            L60 ${height}
            L20 ${height}

            L20 ${height * 0.15}
            L0 ${height * 0.15}
            Z`}
        fill="#FFCB3A"
      />
      <text
        x="50%"
        y="50%"
        font-weight="bold"
        font-family="SVN-Gilroy"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="white"
      >
        {value.toFixed(0)}%
      </text>
    </svg>
  );
};

// const ArrowSvgDefensive = (height: any, value: any) => {
//   height = height || 200;

//   return (
//     <svg height={height} width="80">
//       <path
//         d={`M40 0 L80 ${height * 0.15} L60 ${
//           height * 0.15
//         } L60 ${height} L20 ${height} L20 ${height * 0.15} L0 ${
//           height * 0.15
//         } Z`}
//         fill="#FFCB3A"
//       />
//       <text
//         x="50%"
//         y="50%"
//         font-weight="bold"
//         font-family="SVN-Gilroy"
//         dominant-baseline="middle"
//         text-anchor="middle"
//         fill="white"
//       >
//         {value.toFixed(0)}%
//       </text>
//     </svg>
//   );
// };

export const FootballFieldBalance = (props: any) => {
  const classes = useStyles();
  const footballMidHeight = 262.5;
  const [performances, setPerformances] = useState<any>();

  const { tpi } = props;

  const location = "total";
  const fetchPerformance = async () => {
    if (tpi) {
      const performances = await Team.getPerformances(
        tpi?.competitionId,
        tpi?.seasonId
      );
      setPerformances(performances);
    }
  };

  useEffect(() => {
    fetchPerformance();
  }, [tpi]);

  const offensive = {
    crossLeft: Math.round(
      (100 *
        performances?.analytics?.crossesFromLeftFlank.total
          .crossesFromLeftFlank) /
        (performances?.analytics?.crossesFromLeftFlank.total
          .crossesFromLeftFlank +
          performances?.analytics?.crossesFromRightFlank.total
            .crossesFromRightFlank)
    ),
    crossRight: Math.round(
      (100 *
        performances?.analytics?.crossesFromRightFlank.total
          .crossesFromRightFlank) /
        (performances?.analytics?.crossesFromLeftFlank.total
          .crossesFromLeftFlank +
          performances?.analytics?.crossesFromRightFlank.total
            .crossesFromRightFlank)
    ),
    leftFlankAttacks: Math.round(
      100 * performances?.analytics?.offensiveBalance[location].leftFlankAttacks
    ),
    centerAttacks: Math.round(
      100 * performances?.analytics?.offensiveBalance[location].centerAttacks
    ),
    rightFlankAttacks: Math.round(
      100 *
        performances?.analytics?.offensiveBalance[location].rightFlankAttacks
    ),
  };

  const defensive = {
    crossLeft: Math.round(
      (100 *
        performances?.analytics?.opponentCrossesFromLeftFlank.total
          .crossesFromLeftFlank) /
        (performances?.analytics?.opponentCrossesFromLeftFlank.total
          .crossesFromLeftFlank +
          performances?.analytics?.opponentCrossesFromRightFlank.total
            .crossesFromRightFlank)
    ),
    crossRight: Math.round(
      (100 *
        performances?.analytics?.opponentCrossesFromRightFlank.total
          .crossesFromRightFlank) /
        (performances?.analytics?.opponentCrossesFromLeftFlank.total
          .crossesFromLeftFlank +
          performances?.analytics?.opponentCrossesFromRightFlank.total
            .crossesFromRightFlank)
    ),
    leftFlankAttacks: Math.round(
      100 * performances?.analytics?.defensiveBalance[location].leftFlankAttacks
    ),
    centerAttacks: Math.round(
      100 * performances?.analytics?.defensiveBalance[location].centerAttacks
    ),
    rightFlankAttacks: Math.round(
      100 *
        performances?.analytics?.defensiveBalance[location].rightFlankAttacks
    ),
  };

  return (
    <div className={classes.root}>
      <div className={classes.footballBalance}>
        <div className={classes.offensiveBalance}>
          <div className={classes.titleBalance}>Offensive Balance</div>
          <div className={classes.footballField}>
            <div className={classes.arrowsContainer}>
              {ArrowSvg(
                ((footballMidHeight * offensive.leftFlankAttacks) / 100) * 2,
                offensive.leftFlankAttacks
              )}
              {ArrowSvg(
                ((footballMidHeight * offensive.centerAttacks) / 100) * 2,
                offensive.centerAttacks
              )}
              {ArrowSvg(
                ((footballMidHeight * offensive.rightFlankAttacks) / 100) * 2,
                offensive.rightFlankAttacks
              )}
            </div>
            <div className={classes.arrowsHorizontalContainerOffensive}>
              {BalanceArrowSVG(356, offensive.crossLeft, offensive.crossRight)}
            </div>
            <img src={FootballFieldImg} className={classes.footballFieldImg} />
          </div>
        </div>

        <div className={classes.offensiveBalance}>
          <div className={classes.titleBalance}>Defensive Balance</div>
          <div className={classes.footballField}>
            <div className={classes.arrowsContainerDefensive}>
              {ArrowSvgDefensive(
                ((footballMidHeight * defensive.leftFlankAttacks) / 100) * 2,
                defensive.leftFlankAttacks
              )}
              {ArrowSvgDefensive(
                ((footballMidHeight * defensive.centerAttacks) / 100) * 2,
                defensive.centerAttacks
              )}
              {ArrowSvgDefensive(
                ((footballMidHeight * defensive.rightFlankAttacks) / 100) * 2,
                defensive.rightFlankAttacks
              )}
            </div>
            <div className={classes.arrowsHorizontalContainerDeffensive}>
              {BalanceArrowSVG(356, defensive.crossLeft, defensive.crossRight)}
            </div>
            <img src={FootballFieldImg} className={classes.footballFieldImg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootballFieldBalance;

import React, { useEffect, useState } from "react";
import { FootballFieldCtx } from "../../context/FootballField";
import { useStyles } from "./FootballFieldContent.style";
import {
  map,
  groupBy,
  kebabCase,
  includes,
  forEach,
  keys,
  values,
  find,
  isEmpty,
} from "lodash";
import clsx from "classnames";
import { FORMATIONS } from "../../constants/formation";
import { UserCtx } from "../../context/User";
import { Season } from "../../models/season";
import { computeAge } from "../../constants/player_infor";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { Player } from "../../models/player";

export const FootballFieldContent = () => {
  const classes = useStyles();
  const { user } = React.useContext<any>(UserCtx);
  const { formation, updatePlayer, player, budget, rank, tpiToPpi } =
    React.useContext<any>(FootballFieldCtx);

  const [topWorstPlayer, setTopWorstPlayer] = useState<any>([]); //top 5 Worst players of worst category

  const [season, setSeason] = useState<any>();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [listPlayerPlayedTheMost, setListPlayerPlayedTheMost] =
    React.useState<any>();

  const onClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    Player.getPlayerPlayedTheMost()
      .then((data) => {
        setSeason(data.season);
        filterPlayer(data.players);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, formation, budget, rank]);

  useEffect(() => {
    const worstPlayer = getTop5WorstPlayers(tpiToPpi);
    setTopWorstPlayer(worstPlayer);
  }, [tpiToPpi]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const columns = FORMATIONS[formation.scheme];
  const formationByPosition = groupBy(formation.players, "position");

  const getTop5WorstPlayers = (tpiToPpi: any) => {
    if (isEmpty(tpiToPpi)) return;
    const listCate = Object.keys(tpiToPpi?.tpiCategories);
    var min = tpiToPpi?.tpiCategories[listCate[0]].score;
    var i;
    let top5WorstPlayerOfWorstCate = [];
    for (i = 1; i < listCate.length; i++) {
      var value = tpiToPpi?.tpiCategories[listCate[i]].score;
      if (value < min) {
        min = value;
        top5WorstPlayerOfWorstCate = tpiToPpi?.tpiCategories[
          listCate[i]
        ].players.slice(0, 5);
      }
    }
    return top5WorstPlayerOfWorstCate;
  };

  const onDetailsPlayer = async (player: any, event: any) => {
    setAnchorEl(event.currentTarget);
    const season = await Season.getSeasonById(player?.player?.seasonId);
    const age = computeAge(season, player?.player?.birthDate);
    updatePlayer({ ...player, age: age });
  };

  const divisionSeason = (seasonName: any) => {
    const listSeason = [
      "2008/2009",
      "2009/2010",
      "2010/2011",
      "2011/2012",
      "2012/2013",
      "2013/2014",
      "2014/2015",
      "2015/2016",
      "2016/2017",
      "2017/2018",
      "2018/2019",
      "2019/2020",
    ];
    if (listSeason.indexOf(seasonName) !== -1) {
      return false;
    }
    return true;
  };

  const filterPlayer = (listPlayer: any) => {
    //get list player who played the most to show in bottom, but not coincide with player show in football content
    const listPlayerUniq: any = [];
    forEach(listPlayer, (player1: any) => {
      if (!player1) return;
      const diff = find(formation.players, { playerId: player1._id });
      if (isEmpty(diff)) listPlayerUniq.push(player1);
    });
    setListPlayerPlayedTheMost(listPlayerUniq);
  };

  if (!formation) {
    return null;
  }

  const getTpiToPpiPlayer = (player: any) => {
    const data: any = [];
    forEach(tpiToPpi?.tpiCategories, (details, category) => {
      forEach(details.players, (p: any) => {
        if (player.playerId === p.playerId) {
          const res = {
            [category]: p.score,
          };
          data.push(res);
        }
      });
    });
    return data;
  };

  const listPlayerBottom = (player: any) => {
    return (
      <div className={classes.playerBottom}>
        <div
          className={classes.playerAvatarBottom}
          style={{
            backgroundImage: `url(${
              player?.imageDataURL || "https://via.placeholder.com/150"
            })`,
          }}
        />
        <div className={classes.playerNameBottom}>{player?.shortName}</div>
      </div>
    );
  };

  const popOverRender = (player: any) => {
    const data = getTpiToPpiPlayer(player);
    return (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          <div className={classes.popOverRoot}>
            {map(data, (d: any) => (
              <Typography className={classes.subTypo}>
                <span className={classes.keyText}>{keys(d)}</span>:{" "}
                {parseFloat(values(d).toString()).toFixed(4)}
              </Typography>
            ))}
          </div>
        </Typography>
      </Popover>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.formationLayout}>
        <div className={classes.formation}>
          {map(columns, (positions, index) => {
            return (
              <div
                key={index}
                className={classes.formationColumn}
                style={{ width: `${100 / (columns.length + 1)}%` }}
              >
                {positions.map((position: any, i: number) => {
                  const [player] = formationByPosition[position] || [];
                  const listPlayerId = map(topWorstPlayer, "playerId");
                  return (
                    <div
                      key={i}
                      className={classes.formationPlayer}
                      onClick={(ev) => onDetailsPlayer(player, ev)}
                    >
                      {includes(listPlayerId, player?.playerId) && (
                        <div className={classes.worstPlayer}></div>
                      )}

                      <div className={classes.player}>
                        <div
                          className={classes.playerAvatar}
                          style={{
                            backgroundImage: `url(${
                              player?.player?.imageDataURL ||
                              "https://via.placeholder.com/150"
                            })`,
                          }}
                        />
                        <div className={classes.playerName}>
                          {player?.player?.shortName || "Unknown"}
                        </div>
                      </div>
                      <div
                        className={clsx(
                          classes.status,
                          kebabCase(player?.performance?.gradeLabel)
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <img src="/football_field.svg" className={classes.footballField} alt="" />
      {popOverRender(player)}
      <div className={classes.listPlayerBottom}>
        {listPlayerPlayedTheMost && divisionSeason(season.name)
          ? map(listPlayerPlayedTheMost?.slice(0, 9), (player: any) =>
              listPlayerBottom(player)
            )
          : map(listPlayerPlayedTheMost?.slice(0, 7), (player: any) =>
              listPlayerBottom(player)
            )}
      </div>
    </div>
  );
};

export default FootballFieldContent;

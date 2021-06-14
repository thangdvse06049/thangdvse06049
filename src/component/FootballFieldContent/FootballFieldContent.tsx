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
  findIndex,
  cloneDeep,
  differenceBy,
} from "lodash";
import clsx from "classnames";
import { FORMATIONS } from "../../constants/formation";
import { UserCtx } from "../../context/User";
import { Season } from "../../models/season";
import { computeAge } from "../../constants/player_infor";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { Player } from "../../models/player";
import transferPlayer from "./assets/transferPlayer.png";

export const FootballFieldContent = () => {
  const classes = useStyles();
  const { user } = React.useContext<any>(UserCtx);
  const { formation, updatePlayer, player, tpiToPpi, updateFormation } =
    React.useContext<any>(FootballFieldCtx);

  const [topWorstPlayer, setTopWorstPlayer] = useState<any>([]); //top 5 Worst players of worst category
  const [listPlayerSuggestion, setListPlayerSuggestion] = useState<any>([]);
  const [season, setSeason] = useState<any>();
  const [localScheme, setLocalScheme] = useState<any>();

  const [anchorElDetailSummary, setAnchorElDetailSummary] =
    React.useState(null);
  const [anchorElPlayerSuggest, setAnchorElPlayerSuggest] =
    React.useState(null);

  const [listPlayerPlayedTheMost, setListPlayerPlayedTheMost] =
    React.useState<any>();

  const openDetailSummary = Boolean(anchorElDetailSummary);
  const idDetailSummary = openDetailSummary ? "simple-popover" : undefined;

  const openPlayerSuggest = Boolean(anchorElPlayerSuggest);
  const idPlayerSuggest = openPlayerSuggest ? "simple-popover" : undefined;

  useEffect(() => {
    if (formation && user) {
      Player.getPlayerPlayedTheMost()
        .then((data) => {
          setSeason(data.season);
          filterPlayer(data.players);
        })
        .catch((e) => {
          console.log(e);
        });
      setLocalScheme(formation.scheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, formation]);

  useEffect(() => {
    if (tpiToPpi) {
      const worstPlayer = getTop5WorstPlayers(tpiToPpi);
      setTopWorstPlayer(worstPlayer);
    }
  }, [tpiToPpi]);

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
    event.preventDefault();
    event.stopPropagation();
    setAnchorElDetailSummary(event.currentTarget);
    const season = await Season.getSeasonById(player?.player?.seasonId);
    const age = computeAge(
      season,
      player?.player?.birthDate || player?.player?.player?.birthDate
    );
    updatePlayer({ ...player, age: age });
  };

  const fetchListPlayerSuggestion = async (player: any) => {
    const listSuggestion = await Player.getListPlayerSuggestion({
      player: player,
      scheme: formation.scheme,
    });

    const listUniq = differenceBy(
      listSuggestion,
      formation.players,
      "playerId"
    );

    setListPlayerSuggestion(listUniq);
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
      const diff = find(formation.players, {
        playerId: player1?.playerData?._id,
      });
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
      <div className={classes.formationPlayerBottom}>
        <div className={classes.playerBottom}>
          <div
            className={classes.playerAvatarBottom}
            style={{
              backgroundImage: `url(${
                player?.playerData?.imageDataURL ||
                "https://via.placeholder.com/150"
              })`,
            }}
          />
          <div className={classes.playerNameBottom}>
            {player?.playerData?.shortName || "Unknown"}
          </div>
        </div>

        <div
          className={clsx(
            classes.statusBottom,
            kebabCase(player?.performance?.gradeLabel)
          )}
        />
      </div>
    );
  };

  const popOverDetailSummaryRender = (player: any) => {
    const data = getTpiToPpiPlayer(player);

    const parse = (value: any) => {
      return parseFloat(values(value).toString()).toFixed(4);
    };

    return (
      <Popover
        id={idDetailSummary}
        open={openDetailSummary}
        anchorEl={anchorElDetailSummary}
        onClose={onCloseDetailSummary}
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
            {data.length > 0 ? (
              map(data, (d: any) => (
                <Typography className={classes.subTypo}>
                  {values(d)[0] !== 0 && (
                    <>
                      <span className={classes.keyText}>{keys(d)}</span> :{" "}
                      {parse(values(d))}{" "}
                    </>
                  )}
                </Typography>
              ))
            ) : (
              <div className={classes.noData}>No data</div>
            )}
          </div>
        </Typography>
      </Popover>
    );
  };

  const onCloseDetailSummary = () => {
    setAnchorElDetailSummary(null);
  };

  const onCloseSuggestion = () => {
    setAnchorElPlayerSuggest(null);
  };

  const onChangePlayerSuggestion = async (e: any, player: any) => {
    e.stopPropagation();
    setAnchorElPlayerSuggest(e.currentTarget);
    await fetchListPlayerSuggestion(player);
  };

  const onClickUpdateFormation = (event: React.MouseEvent, player: any) => {
    if (formation) {
      let newList: any = cloneDeep(formation.players);
      const idx = findIndex(formation.players, { position: player.position });
      newList[idx] = player;
      const formationSuggest = {
        scheme: localScheme,
        players: newList,
      };
      updateFormation(formationSuggest);
      onCloseSuggestion();
    }
  };

  const onclosePopOver = () => {
    setListPlayerSuggestion([]);
    onCloseSuggestion();
  };

  const popOverListPlayerSuggestionRender = () => {
    return (
      <Popover
        className={classes.popOverSuggest}
        id={idPlayerSuggest}
        open={openPlayerSuggest}
        anchorEl={anchorElPlayerSuggest}
        onClose={onclosePopOver}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className={classes.typographySuggest}>
          <div className={classes.popOverRootSuggest}>
            {listPlayerSuggestion.length > 0 ? (
              map(listPlayerSuggestion, (player: any) => {
                return (
                  <div
                    className={classes.infor}
                    onClick={(e) => onClickUpdateFormation(e, player)}
                  >
                    <div
                      className={classes.playerAvatar}
                      style={{
                        backgroundImage: `url(${
                          player?.player?.imageDataURL ||
                          "https://via.placeholder.com/150"
                        })`,
                      }}
                    />
                    <div className={classes.inforRight}>
                      <div className={classes.playerNamePopOver}>
                        {player?.player?.shortName}
                      </div>
                      <div className={classes.ppiPopOver}>
                        PPI: {player?.performance?.gradeLabel}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={classes.noDataSuggestion}>
                {" "}
                No suggestion player
              </div>
            )}
          </div>
        </div>
      </Popover>
    );
  };

  return (
    <div className={classes.root}>
      {isEmpty(formation)}
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
                      <div className={classes.changePlayerIcon}>
                        <img
                          onClick={(e) => onChangePlayerSuggestion(e, player)}
                          src={transferPlayer}
                          className={classes.icon}
                          alt=""
                        />
                      </div>

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
                          {player?.player?.shortName ||
                            player?.player?.player?.shortName ||
                            "Unknown"}
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
      {popOverDetailSummaryRender(player)}
      {popOverListPlayerSuggestionRender()}
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

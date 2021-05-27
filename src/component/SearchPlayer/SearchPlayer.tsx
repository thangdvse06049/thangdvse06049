import React, { useState } from "react";
import { useStyles } from "./SearchPlayer.style";
import { Autocomplete } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import Typography from "@material-ui/core/Typography";
import { Player } from "../../models/player";
import {
  debounce,
  map,
  isEmpty,
  kebabCase,
  isNumber,
  isString,
  forEach,
  compact,
} from "lodash";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { LINK, TRANSLATION } from "../../constants/footballGeneral";
import clsx from "classnames";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Collapse } from "react-collapse";
import { computeAge } from "../../constants/player_infor";
import { Radar } from "react-chartjs-2";
import { PPI_CATEGORY_LABEL } from "../../constants/ppi";
import { EmptyScreen } from "../EmptyScreen";
import { CircularProgress } from "@material-ui/core";

export const SearchPlayer = () => {
  const classes = useStyles();

  const [player, setPlayer] = useState<any>(); //player selected
  const [playerPPI, setPlayerPPI] = useState<any>(); //ppi of player selected
  const [playerOption, setPlayerOption] = useState<any>([]); //list player option
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | null>(null);

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

  const renderRadarChart = () => {
    return (
      <Radar
        data={{
          labels: map(
            PPI_CATEGORY_LABEL,
            (value: any, category: any) => PPI_CATEGORY_LABEL[category]
          ),
          datasets: [
            {
              label: `${playerPPI?.seasonPpi} - ${playerPPI?.playerPpi[0]?.positions}`,
              suggestedMax: 100,
              backgroundColor: "rgba(64,112,244, 0.5)",
              pointBackgroundColor: "#4070F4",
              data: map(PPI_CATEGORY_LABEL, (value: any, category: any) => {
                if (!isEmpty(playerPPI))
                  return playerPPI.playerPpi[0]?.summary[category];
              }).map((o: any) => o * 100),
            },
            {
              label: `${playerPPI?.seasonPpiHistory} - ${playerPPI?.playerPpiHistory[0]?.positions}`,
              suggestedMax: 100,
              backgroundColor: "rgba(111,33,94, 0.5)",
              pointBackgroundColor: "#4070F4",
              data: map(PPI_CATEGORY_LABEL, (value: any, category: any) => {
                if (!isEmpty(playerPPI))
                  return playerPPI.playerPpiHistory[0]?.summary[category];
              }).map((o: any) => o * 100),
            },
          ],
        }}
        type="radar"
        options={{
          height: 350,
          weight: 350,
          plugins: {},
          scale: {
            pointLabels: {
              fontSize: 200,
              fontColor: "#ff0000",
            },
            reverse: false,
            gridLines: {
              color: "#3D3D3D",
            },
            ticks: {
              beginAtZero: true,
              suggestedMax: 100,
            },
          },
        }}
      />
    );
  };

  const fetchPlayerData = async (players: any) => {
    const data = forEach(players, async (p: any) => {
      if (isEmpty(p?.birthDate)) return null;
      const age = computeAge(p?.season, p?.birthDate);
      p.age = age;
      return p;
    });
    if (isEmpty(data)) return;
    setPlayerOption(compact(data));
  };

  const fetchPlayerPPI = async (player: any) => {
    const ppi = await Player.getPlayerPPI({
      _id: player._id,
      seasonId: player.seasonId,
    });
    setPlayerPPI(ppi);
  };

  const onChangePlayer = async (event: any, option: any) => {
    setPlayer(null);
    setPlayerPPI(null);
    setPlayerOption([]);
    if (isEmpty(option)) return;
    setPlayer(option);
    await fetchPlayerPPI(option);
  };

  const onSearch = (event: any) => {
    setPlayer(null);
    setOpen(true);
  };

  const fetchSearch = debounce(async (event: any, value: any) => {
    try {
      if (isEmpty(value)) return;
      let listPlayer: any = [];
      listPlayer = await Player.playerSearch(value);

      await fetchPlayerData(listPlayer);
      value = " ";
    } catch (e) {
      alert(e);
    }
  }, 1000);

  const renderCategoryHeader = (category: string, ppi: any) => {
    return (
      <div
        onClick={() => setExpanded(category === expanded ? null : category)}
        className={clsx(classes.categoryHeader, {
          expanded: expanded === category,
        })}
      >
        <div className={classes.categoryInnerHeader}>
          <div
            className={clsx(
              classes.grade,
              kebabCase(getGrade(ppi?.summaryRanked[category]))
            )}
          >
            {getGrade(ppi?.summaryRanked[category])}
          </div>
          <div className={classes.categoryTitle}>{category}</div>
        </div>
        <ArrowDropDownIcon className={classes.arrow} />
      </div>
    );
  };

  const renderDetails = (category: string, details: any, ppi: any) => {
    return (
      <Collapse isOpened={expanded === category} key={category}>
        <div
          className={clsx(classes.categoryContent, {
            expanded: expanded === category,
          })}
        >
          {map(details, ([value], key: any) => {
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
                        getGrade(ppi?.detailsRanked[category][key])
                      )}
                    >
                      {getGrade(ppi?.detailsRanked[category][key])}
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

  const detailPPI = (ppi: any) => {
    return (
      <div className={classes.detailPPIList}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.accordionSum}
          >
            <div className={classes.itemContent}>
              <Typography className={classes.heading}>
                <span className={classes.positionTxt}>position: </span>
                {ppi?.positions.join(", ")}
              </Typography>
              <Typography
                className={clsx(classes.gradeLabel, kebabCase(ppi?.gradeLabel))}
              >
                {ppi?.gradeLabel}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetail}>
            <Typography>
              {map(LINK, (details: any, category: string) => {
                return (
                  <div className={classes.category}>
                    {renderCategoryHeader(category, ppi)}
                    {renderDetails(category, details, ppi)}
                    <div className={classes.categoryContent}> </div>
                  </div>
                );
              })}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };

  const detailPlayer = (player: any) => {
    return (
      <div className={classes.playerInfor}>
        <div className={classes.nameAvtPlayer}>
          <div
            className={classes.avatarPlayer}
            style={{
              backgroundImage: `url(${
                player?.imageDataURL || "https://via.placeholder.com/150"
              })`,
            }}
          ></div>
          <div className={classes.detailInfor}>
            <div className={classes.nameAge}>
              <div
                className={classes.namePlayer}
              >{`${player?.firstName} ${player?.lastName}`}</div>
              <div className={classes.agePlayer}>{player?.age}</div>
            </div>
            <div className={classes.teamCompeInfor}>
              <div
                className={classes.avatarTeam}
                style={{
                  backgroundImage: `url(${
                    player?.team?.imageDataURL ||
                    "https://via.placeholder.com/150"
                  })`,
                }}
              ></div>
              <div className={classes.teamName}>
                {player?.team?.name} - {player?.competition?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const dialogSearchPlayer = () => {
    const onClose = () => {
      setOpen(false);
      setPlayerPPI(null);
    };

    return (
      <div className={classes.content}>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent className={classes.dialogContent}>
            <div className={classes.content}>
              <div className={classes.contentSearch}>
                <Autocomplete
                  className={classes.backColorInSearch}
                  classes={{ listbox: classes.listbox }}
                  id="auto-complete"
                  freeSolo
                  options={playerOption}
                  onInputChange={(e, v) => fetchSearch(e, v)}
                  autoHighlight
                  getOptionLabel={(option: any) =>
                    `${option?.firstName} ${option?.lastName}`
                  }
                  onChange={onChangePlayer}
                  renderOption={(option) =>
                    !isEmpty(option) ? (
                      detailPlayer(option)
                    ) : (
                      <CircularProgress></CircularProgress>
                    )
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Player"
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </div>
              {player && !isString(player) && (
                <div className={classes.contentDisplay}>
                  <div>{detailPlayer(player)}</div>
                  {!isEmpty(playerPPI?.playerPpi) ? (
                    <>
                      <div className={classes.listPlayerInfor}>
                        {map(playerPPI?.playerPpi, (p: any) => detailPPI(p))}
                        {renderRadarChart()}
                      </div>
                    </>
                  ) : (
                    <EmptyScreen></EmptyScreen>
                  )}
                </div>
              )}
              {isString(player) && (
                <Typography className={classes.noPlayerNoti}>
                  Could not be found!
                </Typography>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.backColor}
        options={playerOption.map((c: any) => ({
          name: c?.shortName,
          _id: c?._id,
          avatar: c?.imageDataURL,
          currentTeamId: c?.currentTeamId,
          competitionId: c?.competitionId,
        }))}
        onOpen={onSearch}
        getOptionLabel={(option: any) => option.name}
        id="auto-complete"
        autoComplete
        value={playerPPI ? playerPPI : null}
        onChange={onChangePlayer}
        onInputChange={(e, v) => fetchSearch(e, v)}
        includeInputInList
        renderInput={(params: any) => (
          <TextField {...params} label="Search Player" margin="none" />
        )}
      />
      {open && dialogSearchPlayer()}
    </div>
  );
};

export default SearchPlayer;

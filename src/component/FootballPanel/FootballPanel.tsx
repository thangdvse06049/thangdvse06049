import React, { useEffect } from "react";
import clsx from "classnames";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { FootballPanelGeneral } from "../FootballPanelGeneral";
import { FootballPanelAdvanced } from "../FootballPanelAdvanced";
import { FootballPanelSuggestion } from "../FootballPanelSuggestion";
import { FootballFieldCtx } from "../../context/FootballField";
import { kebabCase } from "lodash";
import { useStyles } from "./FootballPanel.style";
import { Season } from "../../models/season";
import { computeAge } from "../../constants/player_infor";

const TABS = {
  GENERAL: 0,
  ADVANCED: 1,
  SUGGESTION: 2,
};

export const FootballPanel = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(TABS.GENERAL);
  const { player, updatePlayer } = React.useContext<any>(FootballFieldCtx);

  useEffect(() => {
    if (player.playerId && player.age === undefined) {
      fetchPlayerAge(player);
    }
  }, [player]);

  const fetchPlayerAge = async (player: any) => {
    const season = await Season.getSeasonById(player?.player?.seasonId);
    const age = computeAge(season, player?.player?.birthDate);
    updatePlayer({ ...player, age: age });
  };

  const renderPlayer = () => {
    return (
      <div>
        <div className={classes.header}>
          <div
            className={classes.avatar}
            style={{
              backgroundImage: `url(${
                player?.player?.imageDataURL ||
                "https://via.placeholder.com/150"
              })`,
            }}
          ></div>
          <div
            className={clsx(
              classes.status,
              kebabCase(player?.performance?.gradeLabel)
            )}
          >
            {player?.performance?.gradeLabel}
          </div>
          <Typography className={classes.name}>
            {player?.player?.shortName} ({player?.age}) - Match Played (
            {player?.ppi?.nbMatches})
          </Typography>
        </div>
        <div className={classes.tabs}>
          <div
            className={clsx(classes.tab, {
              active: currentTab === TABS.GENERAL,
            })}
            onClick={() => setCurrentTab(TABS.GENERAL)}
          >
            General
          </div>
          <div
            className={clsx(classes.tab, {
              active: currentTab === TABS.ADVANCED,
            })}
            onClick={() => setCurrentTab(TABS.ADVANCED)}
          >
            Advanced
          </div>
          <div
            className={clsx(classes.tab, {
              active: currentTab === TABS.SUGGESTION,
            })}
            onClick={() => setCurrentTab(TABS.SUGGESTION)}
          >
            Suggestions
          </div>
        </div>
        <div className={classes.tabContent}>
          {currentTab === TABS.GENERAL && <FootballPanelGeneral />}
          {currentTab === TABS.ADVANCED && <FootballPanelAdvanced />}
          {currentTab === TABS.SUGGESTION && <FootballPanelSuggestion />}
        </div>

        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle id="max-width-dialog-title">
            Player Suggestion {"<NAME>"}
          </DialogTitle>
          <DialogContent>Hello World</DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderEmpty = () => {
    return <div>empty</div>;
  };

  return (
    <div className={classes.root}>
      {false && renderEmpty()}
      {true && renderPlayer()}
    </div>
  );
};

export default FootballPanel;

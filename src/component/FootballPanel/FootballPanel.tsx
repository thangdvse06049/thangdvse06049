import React from "react";
import { useStyles } from "./FootballPanel.style";
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

const TABS = {
  GENERAL: 0,
  ADVANCED: 1,
  SUGGESTION: 2,
};

export const FootballPanel = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(TABS.SUGGESTION);

  const renderPlayer = () => {
    return (
      <div>
        <div className={classes.header}>
          <div
            className={classes.avatar}
            style={{ backgroundImage: `url(https://via.placeholder.com/150)` }}
          ></div>
          <div className={clsx(classes.status, "good")}>Good</div>
          <Typography className={classes.name}>Kevin Perard</Typography>
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

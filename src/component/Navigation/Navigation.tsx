import { AppBar, Toolbar } from "@material-ui/core";
import React, { useEffect } from "react";
import { useStyles } from "./Navigation.style";
import { useHistory } from "react-router-dom";
import clsx from "classnames";
import { UserCtx } from "../../context/User";
import { TeamInformation } from "../TeamInformation";
import { InforSetting } from "../InforSetting/InforSetting";
import { Season } from "../../models/season";
import { FootballFieldCtx } from "../../context/FootballField";

export const Navigation = () => {
  const classes = useStyles();
  const history = useHistory();
  const { logout, user }: any = React.useContext(UserCtx);
  const { updateFilters, budget } = React.useContext<any>(FootballFieldCtx);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [rankTeamInfor, setRankTeamInfor] = React.useState<any>();

  const fetchTeamRank = async () => {
    const seasonCareer = await Season.getRankSeasonCareer();
    updateFilters(seasonCareer[0]?.rank, budget);
    setRankTeamInfor(seasonCareer[0]);
  };

  useEffect(() => {
    fetchTeamRank();
  }, [user]);

  const onClickLogout = () => {
    logout();
  };

  return (
    <>
      <InforSetting
        setOpenSettings={setOpenSettings}
        openSettings={openSettings}
      />
      <div className={classes.root}>
        <AppBar
          position="static"
          classes={{
            root: classes.appBarRoot,
            colorPrimary: classes.appBarColorPrimary,
          }}
        >
          <Toolbar>
            <img src={"/logo.png"} height="30" className={classes.logo} />
            <div className={classes.verticalBar} />

            <div
              onClick={() => {
                history.push("/team");
              }}
              className={clsx(
                classes.button,
                "team",
                history.location.pathname === "/team" ? "active" : ""
              )}
            >
              <div className={classes.buttonIcon} />
              Team Analytics
            </div>
            <div className={classes.verticalBar} />
            <div
              onClick={() => {
                history.push("/football");
              }}
              className={clsx(
                classes.button,
                "football",
                history.location.pathname === "/football" ? "active" : ""
              )}
            >
              <div className={classes.buttonIcon} />
              Football Field
            </div>

            <div className={classes.verticalBar} />
            <div className={classes.flexGrow} />

            <div className={classes.teamInFor}>
              <div className={classes.text}>
                Competition Year: {rankTeamInfor?.season?.name}
              </div>
              <div className={classes.text}>Rank: {rankTeamInfor?.rank}</div>
              <div className={classes.number}>
                <div>Wins: {rankTeamInfor?.gameWon}</div>
                <div>Loses: {rankTeamInfor?.gameLost}</div>
                <div>Draws: {rankTeamInfor?.gameDraw}</div>
              </div>
            </div>
            <div className={classes.flexGrow} />

            <div className={classes.teamInfor}>
              <TeamInformation />
            </div>
            <div className={classes.verticalBar} />

            <div
              className={clsx(classes.button, "settings")}
              onClick={() => setOpenSettings(true)}
            >
              <div className={classes.buttonIcon} />
              Settings
            </div>
            <div className={classes.verticalBar} />
            <div
              className={clsx(classes.button, "logout")}
              onClick={onClickLogout}
            >
              <div className={classes.buttonIcon} />
              Logout
            </div>
            <div className={classes.verticalBar} />
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navigation;

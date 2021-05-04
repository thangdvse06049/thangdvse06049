import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";
import { useStyles } from "./Navigation.style";
import { useHistory } from "react-router-dom";
import clsx from "classnames";
import { UserCtx } from "../../context/User";
import { TeamInformation } from "../TeamInformation";
import { InforSetting } from "../InforSetting/InforSetting";

export const Navigation = () => {
  const classes = useStyles();
  const history = useHistory();
  const { logout }: any = React.useContext(UserCtx);
  const [openSettings, setOpenSettings] = React.useState(false);

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

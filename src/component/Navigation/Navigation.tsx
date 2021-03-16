import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./Navigation.style";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import clsx from "classnames";

export const Navigation = () => {
  const classes = useStyles();
  const history = useHistory();

  const onClickLogout = () => {
    history.push("/aa/qwee");
  };

  return (
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
          <div className={classes.verticalBar} />
          <div className={clsx(classes.button, "logout")}>
            <div className={classes.buttonIcon} />
            Logout
          </div>
          <div className={classes.verticalBar} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;

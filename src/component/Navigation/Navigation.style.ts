import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  verticalBar: {
    width: 1,
    minHeight: 64,
    height: "100%",
    background: "rgba(225,227,235,1)",
  },
  logo: {
    height: 36,
    marginRight: theme.spacing(3),
  },
  appBarRoot: {
    color: "rgba(113,120,139,1)",
  },
  appBarColorPrimary: {
    background: "rgba(245,247,250,1)",
    borderBottom: `1px solid #E1E3EB`,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: `22px ${theme.spacing(3)}px 19px`,
    cursor: "pointer",
    fontSize: 14,
    borderBottom: `3px solid transparent`,
    "&:hover, &.active": {
      background: "white",
      color: "rgba(64,112,244,1)",
      fontWeight: 500,
      borderBottom: `3px solid rgba(64,112,244,1)`,
      "&.football $buttonIcon": {
        backgroundImage: `url(/field_active.svg)`,
      },
      "&.team $buttonIcon": {
        backgroundImage: `url(/analytics_active.svg)`,
      },
      "&.logout $buttonIcon": {
        backgroundImage: `url(/logout_fill.svg)`,
      },
      "&.settings $buttonIcon": {
        backgroundImage: `url(/undo_fill.svg)`,
      },
    },
    "&.football $buttonIcon": {
      height: 13,
      width: 20,
      backgroundImage: `url(/field.svg)`,
    },
    "&.team $buttonIcon": {
      height: 13,
      width: 20,
      backgroundImage: `url(/analytic.svg)`,
    },
    "&.logout $buttonIcon": {
      height: 16,
      width: 17,
      backgroundImage: `url(/logout.svg)`,
    },
    "&.settings $buttonIcon": {
      height: 16,
      width: 17,
      backgroundImage: `url(/undo.svg)`,
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(0.5),
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  flexGrow: {
    flexGrow: 1,
  },
  teamInfor: {
    minHeight: 64,
    width: 225,
    height: "100%",
    borderLeft: "1px solid #E1E3EB",
  },
  inforSetting: {
    minHeight: 64,
    width: 100,
    height: "100%",
    borderLeft: "1px solid #E1E3EB",
    borderRight: "1px solid #E1E3EB",
  },
}));

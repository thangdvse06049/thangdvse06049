import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    width: 349,
    maxHeight: `calc(100vh - ${theme.spacing(4)}px - 2px - 64px - 43px - 13px)`,
    minHeight: `calc(100vh - ${theme.spacing(4)}px - 2px - 64px - 43px - 13px)`,
    overflowY: "scroll",
  },
  header: {
    position: "relative",
    padding: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "column",
  },
  avatar: {
    border: "2px solid #aaa",
    borderRadius: "50%",
    height: 62,
    width: 62,
    backgroundSize: "cover",
  },
  status: {
    position: "absolute",
    top: 75,
    background: "rgba(37,215,120,1)",
    height: 22,
    minWidth: 58,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 35,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
    color: "white",
    "&.excellent": {
      background: "#4BAEEA",
    },
    "&.good": {
      background: "#4BAC5B",
    },
    "&.average-but-good": {
      background: "#e4bd26",
    },
    "&.average-but-bad": {
      background: "#df8244",
    },
    "&.bad": {
      background: "#ec3323",
    },
    "&.terrible": {
      background: "#68369a",
    },
  },
  name: {
    fontSize: 18,
    fontWeight: 600,
    marginTop: 15,
  },
  tabs: {
    display: "flex",
  },
  tab: {
    cursor: "pointer",
    height: 50,
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "1px solid #E1E3EB",
    borderBottom: "1px solid #E1E3EB",
    color: "rgba(225,227,235,1)",
    fontWeight: 500,
    "&:hover, &.active": {
      color: `rgba(12,21,46,1)`,
      background: "#E1E3EB",
    },
  },
  tabContent: {},
}));

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    height: `calc(100% - 50px - ${theme.spacing(1)}px)`,
    borderRadius: 6,
    position: "relative",
  },
  footballField: {
    width: "100%",
    height: "100%",
  },
  formationLayout: {
    position: "absolute",
    left: "7%",
    right: "7%",
    top: "7%",
    bottom: "7%",
    // background: "red",
  },
  formation: {
    padding: `${theme.spacing(2)}px`,
    // background: "blue",
    height: "100%",
    display: "flex",
    width: "80%",
    maxWidth: "80%",
  },
  formationColumn: {
    // background: "purple",
    marginRight: `${theme.spacing(1)}px`,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    "&:last-child": {
      marginRight: 0,
    },
  },
  formationPlayer: {
    overflow: "hidden",
    background: "green",
    borderRadius: 6,
  },
  playerName: {
    textTransform: "uppercase",
    fontStyle: "italic",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    alignItems: "center",
    verticalAlign: "middle",
    lineHeight: "34px",
    padding: `${theme.spacing(1)}px`,
  },
  playerAvatar: {
    minHeight: 50,
    minWidth: 50,
    maxHeight: 50,
    maxWidth: 50,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "#fff",
  },
  player: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    background: "#0C152E",
    color: "#fff",
    fontWeight: 500,
    height: 50,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    position: "relative",
    display: "flex",
    width: "100%",
    "&:hover, &.active": {
      opacity: 0.6,
      cursor: "pointer",
    },
  },
  status: {
    width: "100%",
    height: 5,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    "&.excellent": {
      background: "#4BAEEA",
    },
    "&.good": {
      background: "#4BAC5B",
    },
    "&.normal": {
      background: "#68369A",
    },
    "&.bad": {
      background: "#DF8244",
    },
    "&.terrible": {
      background: "#EC3323",
    },
  },
}));

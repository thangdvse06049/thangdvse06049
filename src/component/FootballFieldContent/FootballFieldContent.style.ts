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
    overflow: "visible",
    background: "green",
    borderRadius: 6,
    position: "relative",
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
  playerGK: {
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
  },
  statusGK: {
    width: "100%",
    height: 10,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    background: "white",
  },
  status: {
    width: "100%",
    height: 10,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
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
  listPlayerBottom: {
    position: "absolute",
    top: "94%",
    left: "7%",
    right: "7%",
    display: "flex",
    placeContent: "center",
  },
  playerAvatarBottom: {
    minHeight: 38,
    minWidth: 38,
    maxHeight: 38,
    maxWidth: 38,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "#fff",
  },
  playerBottom: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    background: "#0C152E",
    color: "#fff",
    fontWeight: 500,
    height: 35,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    position: "relative",
    display: "flex",
    width: "17%",
  },
  playerNameBottom: {
    textTransform: "uppercase",
    fontStyle: "italic",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    alignItems: "center",
    verticalAlign: "middle",
    padding: `${theme.spacing(1)}px`,
  },
  worstPlayer: {
    width: 20,
    height: 20,
    borderRadius: 90,
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    marginRight: -7,
    marginTop: -7,
    right: 0,
    zIndex: 999,
  },
  typography: {
    padding: theme.spacing(2),
  },
  popOverRoot: {
    width: 180,
    height: 115,
    overflowY: "scroll",
  },
  subTypo: {
    fontSize: 15,
  },
  keyText: {
    fontWeight: 500,
  },
}));

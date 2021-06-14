import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  player: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    "&.grey": {
      background: "#F0F7F7",
    },
  },
  playerAvatar: {
    width: 42,
    height: 42,
    backgroundSize: "cover",
    margin: `10px ${theme.spacing(1)}px`,
    backgroundPosition: "top",
    alignSelf: "end",
  },
  playerName: {
    fontWeight: "bold",
  },
  playerBudget: {
    padding: `0 ${theme.spacing(1)}px`,
  },
  emptySuggestions: {
    padding: `${theme.spacing(2)}px`,
    textAlign: "center",
  },
  playerInfo: {
    flexGrow: 1,
    padding: `0 ${theme.spacing(1)}px`,
    width: "50%",
  },
  circular: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  categoryHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    "&.expanded $arrow": {
      transform: "rotate(180deg)",
    },
    zIndex: 1,
    overflow: "hidden",
  },
  categoryInnerHeader: {
    display: "flex",
    alignItems: "center",
  },
  categoryContent: {
    paddingLeft: theme.spacing(1),
  },
  grade: {
    textTransform: "uppercase",
    background: "transparent",
    padding: 5,
    lineHeight: "10px",
    display: "inline-flex",
    borderRadius: 6,
    color: "white",
    fontSize: 10,
    fontWeight: 600,
    "&.excellent": {
      background: "#4BAEEA",
    },
    "&.good": {
      background: "#3b7144",
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
    "&.error": {
      color: "#EC3323",
    },
  },
  arrow: {
    transition: `transform 0.5s ease`,
  },
  categoryTitle: {
    marginLeft: theme.spacing(0.5),
    fontWeight: 500,
    color: "rgba(12,21,46,1)",
    fontSize: 15,
    textTransform: "uppercase",
  },
  contentRow: {
    marginBottom: 5,
  },
  contentKey: {
    textTransform: "uppercase",
    fontSize: 10,
  },
  contentValue: {
    display: "flex",
    justifyContent: "space-between",
  },
  detailPPIList: {
    marginBottom: 10,
  },
  accordionSum: {
    border: "1px solid lightGray",
    "&.grey": {
      backgroundColor: "#F0F7F7",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  positionTxt: {
    fontWeight: 500,
  },
  gradeLabel: {
    color: "white",
    padding: 5,
    fontSize: 10,
    fontWeight: 600,
    marginLeft: 4,
    borderRadius: 6,
    textTransform: "uppercase",
    height: 25,
    "&.excellent": {
      background: "#4BAEEA",
    },
    "&.good": {
      background: "#3b7144",
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
  itemContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  accordionDetail: {
    borderLeft: "1px solid lightGray",
    borderRight: "1px solid lightGray",
    borderBottom: "1px solid lightGray",
    "&.grey": {
      background: "#F0F7F7",
    },
  },
  category: {},
}));

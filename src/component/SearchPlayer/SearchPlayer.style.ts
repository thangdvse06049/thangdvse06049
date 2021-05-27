import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 10,
    width: 150,
    height: 57,
  },
  backColor: {
    "& > div > div > input ": {
      width: 300,
      background: "none !important",
      marginTop: 5,
      caretColor: "black !important",
    },
    width: 330,
  },
  backColorInSearch: {
    width: 550,
  },
  content: {
    width: 550,
    height: 640,
    display: "block",
  },
  contentSearch: {
    display: "flex",
    width: 550,
    marginBottom: 20,
  },
  contentDisplay: {
    width: 550,
    height: 460,
  },
  listPlayerInfor: {
    display: "block",
    padding: 10,
    width: "100%",
    height: "100%",
    overflowY: "scroll",
  },
  avatarPlayer: {
    border: "1px solid #aaa",
    borderRadius: "10%",
    height: 80,
    minWidth: 80,
    backgroundSize: "cover",
  },
  nameAvtPlayer: {
    display: "flex",
    height: 80,
  },
  namePlayer: {
    marginLeft: 15,
    marginTop: 5,
    flexGrow: 1,
    flex: 1,
  },
  agePlayer: { marginTop: 5 },
  avatarTeam: {
    border: "2px solid #aaa",
    borderRadius: "50%",
    height: 40,
    width: 40,
    backgroundSize: "cover",
  },
  teamName: {
    fontSize: 15,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    marginLeft: 10,
  },
  nameAge: {
    fontSize: 20,
    fontWeight: 500,
    display: "flex",
  },
  textInfor: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 500,
  },
  playerInfor: {
    width: "100%",
    height: 80,
    marginBottom: 5,
    marginTop: 5,
  },
  dialogContent: {
    overflowY: "hidden",
  },
  detailInfor: {
    width: "100%",
    height: "100%",
    display: "block",
  },
  teamCompeInfor: {
    display: "flex",
    marginLeft: 10,
    marginTop: 5,
    fontSize: 20,
    fontWeight: 400,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordionSum: {
    border: "1px solid lightGray",
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
  category: {},
  contentRow: {
    marginBottom: 5,
  },
  contentKey: {
    textTransform: "uppercase",
  },
  contentValue: {
    display: "flex",
    justifyContent: "space-between",
  },
  accordionDetail: {
    borderLeft: "1px solid lightGray",
    borderRight: "1px solid lightGray",
    borderBottom: "1px solid lightGray",
  },
  detailPPIList: {
    marginBottom: 10,
  },
  positionTxt: {
    fontWeight: 500,
  },
  listbox: {
    height: 500,
    maxHeight: "500px !important",
  },
  noPlayerNoti: {
    justifyContent: "center",
    display: "flex",
    height: "80%",
    alignItems: "center",
    fontSize: 20,
  },
  radarChart: {
    width: 300,
    height: 300,
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
  itemContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
}));

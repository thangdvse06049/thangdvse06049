import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingLeft: 5,
  },
  category: {},
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
  arrow: {
    transition: `transform 0.5s ease`,
  },
  categoryTitle: {
    fontWeight: 500,
    color: "rgba(12,21,46,1)",
    fontSize: 15,
    textTransform: "uppercase",
    marginLeft: 5,
  },
  categoryTitleNotStar: {
    fontWeight: 500,
    color: "rgba(12,21,46,1)",
    fontSize: 15,
    textTransform: "uppercase",
    marginLeft: 30,
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
    marginLeft: theme.spacing(0.5),
    padding: 5,
    lineHeight: "10px",
    display: "inline-flex",
    borderRadius: 6,
    color: "white",
    fontSize: 10,
    fontWeight: 600,
    "&.Excellent": {
      background: "#4BAEEA",
    },
    "&.Bon": {
      background: "#3b7144",
    },
    "&.Acceptable": {
      background: "#e4bd26",
    },
    "&.Pénalisant": {
      background: "#df8244",
    },
    "&.Mauvais": {
      background: "#ec3323",
    },
    "&.Terrible": {
      background: "#68369a",
    },
    "&.error": {
      color: "#EC3323",
    },
  },
  contentRow: {
    marginBottom: 5,
  },
  contentKey: {
    textTransform: "uppercase",
    marginLeft: 22,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  contentValue: {
    display: "flex",
    justifyContent: "space-between",
  },
  categoryInnerHeaderGK: {
    display: "flex",
    alignItems: "center",
    marginTop: 5,
  },
}));

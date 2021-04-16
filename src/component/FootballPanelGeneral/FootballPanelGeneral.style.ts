import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
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
    marginLeft: theme.spacing(0.5),
    fontWeight: 500,
    color: "rgba(12,21,46,1)",
    fontSize: 15,
    textTransform: "uppercase",
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
      background: "#68369A",
    },
    "&.average-but-bad": {
      background: "#68369A",
    },
    "&.bad": {
      background: "#DF8244",
    },
    "&.terrible": {
      background: "#EC3323",
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
  },
  contentValue: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

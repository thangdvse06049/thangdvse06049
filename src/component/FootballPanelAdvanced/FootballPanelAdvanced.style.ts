import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  category: {
    marginBottom: theme.spacing(2),
  },
  categoryTitle: {
    fontWeight: 600,
    textTransform: "uppercase",
    marginBottom: theme.spacing(1),
    display: "flex",
  },
  grade: {
    display: "inline-flex",
    lineHeight: "12px",
    fontSize: 12,
    alignItems: "center",
    border: "1px solid black",
    borderRadius: 6,
    marginRight: 2,
    marginBottom: 2,
    "&.excellent": {
      border: "1px solid #4BAEEA",
      "& $gradeKey": {
        borderLeft: "1px solid #4BAEEA",
        background: "#4BAEEA",
      },
    },
    "&.good": {
      border: "1px solid #4BAC5B",
      "& $gradeKey": {
        borderLeft: "1px solid #4BAC5B",
        background: "#4BAC5B",
      },
    },
    "&.ok": {
      border: "1px solid #e4bd26",
      "& $gradeKey": {
        borderLeft: "1px solid #e4bd26",
        background: "#e4bd26",
      },
    },
    "&.average": {
      border: "1px solid #df8244",
      "& $gradeKey": {
        borderLeft: "1px solid #df8244",
        background: "#df8244",
      },
    },
    "&.bad": {
      border: "1px solid #ec3323",
      "& $gradeKey": {
        borderLeft: "1px solid #ec3323",
        background: "#ec3323",
      },
    },
    "&.terrible": {
      border: "1px solid #68369a",
      "& $gradeKey": {
        borderLeft: "1px solid #68369a",
        background: "#68369a",
      },
    },
  },
  gradeKey: {
    padding: "5px 5px",
    borderLeft: "1px solid black",
    background: "black",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  gradeValue: {
    padding: "5px 2px",
  },
  teamSeasonInfor: {
    marginLeft: "auto",
    fontWeight: 400,
  },
}));

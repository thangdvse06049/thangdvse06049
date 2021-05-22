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
      border: "1px solid green",
      "& $gradeKey": {
        borderLeft: "1px solid green",
        background: "green",
      },
    },
    "&.good": {
      border: "1px solid blue",
      "& $gradeKey": {
        borderLeft: "1px solid blue",
        background: "blue",
      },
    },
    "&.ok": {
      border: "1px solid teal",
      "& $gradeKey": {
        borderLeft: "1px solid teal",
        background: "teal",
      },
    },
    "&.average": {
      border: "1px solid #ff9800",
      "& $gradeKey": {
        borderLeft: "1px solid #ff9800",
        background: "#ff9800",
      },
    },
    "&.bad": {
      border: "1px solid orange",
      "& $gradeKey": {
        borderLeft: "1px solid orange",
        background: "orange",
      },
    },
    "&.terrible": {
      border: "1px solid red",
      "& $gradeKey": {
        borderLeft: "1px solid red",
        background: "red",
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

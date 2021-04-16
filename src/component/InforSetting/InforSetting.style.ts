import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  listSettings: {
    display: "flex",
    "& > div": {
      marginRight: 15,
    },
  },
  backColor: {
    "& > div > div > input ": {
      width: 170,
      background: "none !important",
      marginTop: 5,
      caretColor: "black !important",
    },
    width: 150,
  },
}));

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px`,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    width: "100%",
    height: 500,
  },
  text: {
    fontSize: 22,
    fontWeight: 600,
  },
}));

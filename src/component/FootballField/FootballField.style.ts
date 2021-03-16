import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: `${theme.spacing(2)}px`,
    height: `calc(100vh - ${theme.spacing(4)}px - 2px - 64px)`,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
}));

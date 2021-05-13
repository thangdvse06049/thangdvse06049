import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px`,
    display: "flex",
    alignItems: "center",
  },
  leftPanel: {
    border: "1px solid #E1E3EB",
    // background: "white",
    width: 351,
    maxHeight: `calc(100vh - ${theme.spacing(4)}px - 2px - 64px)`,
    minHeight: `calc(100vh - ${theme.spacing(4)}px - 2px - 64px)`,
    borderRadius: 6,
    display: "block",
  },
}));

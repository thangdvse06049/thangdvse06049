import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  player: {
    display: "flex",
    alignItems: "center",
    height: 50,
    "&.grey": {
      background: "#F0F7F7",
    },
    "&:hover": {
      opacity: 0.5,
    },
  },
  playerAvatar: {
    width: 42,
    height: 42,
    backgroundSize: "cover",
    margin: `0 ${theme.spacing(1)}px`,
  },
  playerName: {
    flexGrow: 1,
    padding: `0 ${theme.spacing(1)}px`,
  },
  playerBudget: {
    padding: `0 ${theme.spacing(1)}px`,
  },
}));

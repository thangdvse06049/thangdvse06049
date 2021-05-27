import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  footballField: {
    position: "relative",
  },
  footballFieldImg: {
    display: "block",
  },
  arrowsContainer: {
    position: "absolute",
    bottom: 32,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    left: 20,
    right: 20,
  },
  arrowsHorizontalContainer: {
    position: "absolute",
    top: "25%",
    left: 12,
    right: 12,
  },
  footballBalance: {
    display: "block",
  },
  titleBalance: {
    color: "#364E65",
    fontSize: 18,
    fontStyle: "normal",
    fontFamily: "SVN-Gilroy, Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    lineHeight: "103.8%",
    marginBottom: 10,
    marginTop: 20,
  },
  offensiveBalance: {
    display: "block",
  },
}));

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
    width: 315,
  },
  arrowsContainer: {
    position: "absolute",
    bottom: 25,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    left: 20,
    right: 20,
  },
  arrowsContainerDefensive: {
    position: "absolute",
    bottom: 250,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    left: 20,
    right: 20,
  },
  arrowsHorizontalContainerOffensive: {
    position: "absolute",
    top: "25%",
    left: 12,
    right: 12,
  },
  arrowsHorizontalContainerDeffensive: {
    position: "absolute",
    top: "60%",
    left: 12,
    right: 12,
  },
  footballBalance: {
    display: "flex",
    width: "100%",
    marginBottom: 20,
  },
  titleBalance: {
    color: "#364E65",
    fontSize: 18,
    fontStyle: "normal",
    fontFamily: "SVN-Gilroy, Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    lineHeight: "103.8%",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  offensiveBalance: {
    display: "block",
    margin: "auto",
  },
}));

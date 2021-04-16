import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    padding: 6,
    justifyContent: "center",
  },
  avatar: {
    marginTop: 2,
    border: "1px solid #aaa",
    borderRadius: "50%",
    height: 50,
    width: 50,
    backgroundSize: "cover",
  },
  teamName: {
    color: "black",
    fontWeight: 600,
    fontSize: 20,
    marginLeft: 10,
    alignSelf: "center",
  },
}));

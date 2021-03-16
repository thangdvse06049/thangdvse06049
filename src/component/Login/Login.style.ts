import { makeStyles } from "@material-ui/core/styles";
import BackgroundJPG from "./assets/background.jpg";

export const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${BackgroundJPG})`,
    backgroundSize: "cover",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  logo: {
    height: 105,
  },
  form: {
    padding: "20px 57px 66px 57px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.75)",
  },
  title: {
    marginBottom: 34,
  },
  inputEmail: {
    marginBottom: 18,
  },
  inputPassword: {
    marginBottom: 50,
  },
  btnSubmit: {},
  loading: {
    marginRight: "0.5rem",
  },
  alert: {
    marginBottom: "1rem",
  },
});

import React from "react";
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { useStyles } from "./Login.style";
import LogoSVG from "./assets/logo.svg";

export const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setError(false);
    setLoading(true);

    setTimeout(() => {
      if (!password || !email) {
        setError(true);
        setLoading(false);
      } else {
        history.push("/football");
      }
    }, 1000);
  };

  const onChangeEmail = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        <img src={LogoSVG} className={classes.logo} alt="" />
        <Typography className={classes.title} variant="h1">
          Login To Your Account
        </Typography>
        {hasError && (
          <Alert className={classes.alert} variant="filled" severity="error">
            You have an error in your email/password
          </Alert>
        )}
        <TextField
          className={classes.inputEmail}
          id="email"
          label="Email"
          onChange={onChangeEmail}
          disabled={isLoading}
          fullWidth
        />
        <TextField
          className={classes.inputPassword}
          id="password"
          label="Password"
          onChange={onChangePassword}
          disabled={isLoading}
          type="password"
          fullWidth
        />
        <Button
          type="submit"
          className={classes.btnSubmit}
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          startIcon={
            isLoading && (
              <CircularProgress
                className={classes.loading}
                size={15}
                color="inherit"
              />
            )
          }
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;

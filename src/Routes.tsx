import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserCtx } from "./context/User";
import FootballPage from "./pages/Football";
import LoginPage from "./pages/Login";

export const Routes = () => {
  const { user } = React.useContext(UserCtx);

  return (
    <Switch>
      <Route exact path="/">
        {!user ? <LoginPage /> : <FootballPage />}
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;

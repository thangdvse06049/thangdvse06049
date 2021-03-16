import React from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import FootballPage from "./pages/Football";
import LoginPage from "./pages/Login";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/football">
        <FootballPage />
      </Route>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Redirect to="/football" />
    </Switch>
  );
};

export default Routes;

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserCtx } from "./context/User";
import FootballPage from "./pages/Football";
import LoginPage from "./pages/Login";
import TeamPage from "./pages/Team";

export const Routes = () => {
  const { user } = React.useContext(UserCtx);

  const logged = () => {
    return (
      <Switch>
        <Route path="/football" component={FootballPage} />
        <Route path="/team" component={TeamPage} />
        <Redirect to="/team" />
      </Switch>
    );
  };

  const notYetLogin = () => {
    return (
      <Switch>
        <Route exact path="/football" component={FootballPage}>
          {!user ? <LoginPage /> : <FootballPage />}
          <Redirect to="/football" />
        </Route>
        <Route exact path="/team" component={TeamPage}>
          {!user ? <LoginPage /> : <TeamPage />}
          <Redirect to="/team" />
        </Route>
      </Switch>
    );
  };

  const render = () => {
    if (!user) {
      return notYetLogin();
    } else {
      return logged();
    }
  };

  return render();
};

export default Routes;

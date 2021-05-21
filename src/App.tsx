import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./context/User";
import Routes from "./Routes";
import withTheme from "./theme";
import FootballFieldProvider from "./context/FootballField";

function App() {
  return (
    <Router>
      <FootballFieldProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
      </FootballFieldProvider>
    </Router>
  );
}

export default withTheme(App);

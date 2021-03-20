import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./context/User";
import Routes from "./Routes";
import withTheme from "./theme";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes />
      </UserProvider>
    </Router>
  );
}

export default withTheme(App);

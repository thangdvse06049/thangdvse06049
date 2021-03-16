import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import withTheme from "./theme";

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default withTheme(App);

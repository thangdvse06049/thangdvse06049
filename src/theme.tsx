import React from "react";
import {
  MuiThemeProvider,
  createMuiTheme,
  ThemeOptions,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { JssProvider, SheetsRegistry } from "react-jss";
import { create } from "jss";
import preset from "jss-preset-default";
import { Shadows } from "@material-ui/core/styles/shadows";

const jss = create(preset());
// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  shadows: Array(25).fill("none") as Shadows,
  palette: {
    primary: {
      light: "#668cf6",
      main: "#4070f4",
      dark: "#2c4eaa",
      contrastText: "#fff",
    },
    background: {
      default: "#EDF0F5",
    },
  },
  typography: {
    h1: {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "25px",
      lineHeight: "103.8%",
      color: "#364E65",
    },
    h2: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "20px",
      lineHeight: "103.8%",
      color: "#364E65",
    },
    h3: {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "103.8%",
      color: "#364E65",
    },
    h4: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "103.8%",
      color: "#364E65",
    },
    h5: {
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "13px",
      lineHeight: "103.8%",
      color: "#364E65",
    },
    h6: {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "13px",
      lineHeight: "103.8%",
      color: "#364E65",
    },
  },
});

function withTheme(Component: Function) {
  function WithTheme(props: ThemeOptions) {
    const sheets = new SheetsRegistry();

    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <JssProvider registry={sheets} jss={jss}>
        <MuiThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      </JssProvider>
    );
  }

  return WithTheme;
}

export default withTheme;

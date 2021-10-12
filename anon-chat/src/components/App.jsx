import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightThemeOptions } from "../styles/theme";
import Lobby from "./Lobby";

const theme = createTheme(lightThemeOptions);

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Lobby />
      </ThemeProvider>
    </>
  );
}

export default App;

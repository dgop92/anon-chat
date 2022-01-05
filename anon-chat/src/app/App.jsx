import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightThemeOptions } from "../styles/theme";
import AppSetup from "./AppSetup";

const theme = createTheme(lightThemeOptions);

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppSetup />
      </ThemeProvider>
    </>
  );
}

export default App;

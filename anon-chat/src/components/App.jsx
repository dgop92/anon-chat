import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { lightThemeOptions } from "../styles/theme";

const theme = createTheme(lightThemeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained">hola</Button>
    </ThemeProvider>
  );
}

export default App;

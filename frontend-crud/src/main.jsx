import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4763FF",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#000000",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);

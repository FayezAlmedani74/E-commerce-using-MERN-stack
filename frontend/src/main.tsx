import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createTheme,  } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#4caf50" },
    secondary: { main: "#ff9800" },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    button: { textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

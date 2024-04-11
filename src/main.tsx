import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./i18n.ts";
import { ColorModeScript } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {localStorage.getItem("chakra-ui-color-mode") ? (
      <></>
    ) : (
      <>{localStorage.setItem("chakra-ui-color-mode", "dark")}</>
    )}
    <ColorModeScript initialColorMode="dark" />
    <App />
  </React.StrictMode>,
);

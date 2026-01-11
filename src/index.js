import React from "react";
import ReactDOM from "react-dom/client";
import "./app/styles/globals.scss";
import App from "./App";
import { AppProviders } from "./app/providers/AppProviders";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);

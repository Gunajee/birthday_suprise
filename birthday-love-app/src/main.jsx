import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { initDevtoolsBlock } from "./utils/devtoolsBlock";

// Only runs in production build (npm run build), not during npm run dev
if (import.meta.env.PROD) {
  initDevtoolsBlock();
}
// To this (forces block even in dev — for testing only):
// initDevtoolsBlock();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

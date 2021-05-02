import React from "react";

import ReactDOM from "react-dom";
import "./index.css";
import NavDrawer from "./components/NavDrawer/NavDrawer";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeManager from './ThemeManager';

import App from "./App";

const routes = [
  {
    path: "/",
    title: "Home",
    module: "./views/Home/Home",
  },
  {
    path: "/projects",
    title: "Projects",
    module: "./views/Projects/Projects",
  },
  {
    path: "/mapp",
    title: "New Mapp",
    module: "./views/Mapp/Mapp",
  },
  {
    path: "/profile",
    title: "Profile",
    module: "./views/Profile/Profile",
  },
];

const TManager = ThemeManager.Instance;
const startTheme = TManager.currentTheme;

function handleSwitch(ev: any) {
  TManager.toggleTheme();

}
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div
        id="toggle"
        className={`${startTheme} main-window`}
      >
        <NavDrawer routes={routes} handleSwitch={handleSwitch}></NavDrawer>
        <App></App>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

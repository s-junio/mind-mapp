import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NavDrawer from "./components/NavDrawer/NavDrawer";
import Home from "./views/Home/Home";
import Projects from "./views/Projects/Projects";
import Mapp from "./views/Mapp/Mapp";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function handleSwitch(ev: any) {
  const elem = document.getElementById("toggle");
  if (elem) {
    elem.classList.toggle("light-mode");
    elem.classList.toggle("dark-mode");
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div id="toggle" className="light-mode main-window">
        <NavDrawer handleSwitch={handleSwitch}></NavDrawer>
        <Switch>
          <Route path="/projects">
            <Projects></Projects>
          </Route>
          <Route path="/mapp">
            <Mapp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

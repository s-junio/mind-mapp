import React from "react";
import "./Home.css";
import MButton from "../../components/MButton/MButton";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  const goToCreate = function () {
    history.push("/mapp");
  };

  return (
    <div className="home-wrapper">
      <header className="Home-header">
        <div className="greeting">
          <h1>A new way to write down your thoughts.</h1>
          <MButton handleClick={goToCreate} label="Start"></MButton>
        </div>
      </header>
      <div className="footer"></div>
    </div>
  );
}

export default Home;

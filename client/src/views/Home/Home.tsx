import React from "react";
import "./Home.css";
import MButton from "../../components/MButton/MButton";
import { useHistory } from "react-router-dom";
import Card from "../../components/Card/Card";
import SergioPic from "../../assets/profile_nobg.png";

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
      <header>
        <div>
          <h1>Motivation</h1>
        </div>
      </header>
      <header>
        <div>
          <h1>Who are we?</h1>
          <div className="cards">
            <Card
              name="Sérgio Ferreira"
              desc="ELECTRONIC ENGINEER STUDENT"
              image={SergioPic}
            ></Card>
            <Card
              name="Christophe Magalhães"
              desc="ELECTRONIC ENGINEER STUDENT"
              image={SergioPic}
            ></Card>
          </div>
        </div>
      </header>
      <footer className="footer">
        
      </footer>
    </div>
  );
}

export default Home;

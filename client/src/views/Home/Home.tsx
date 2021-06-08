import React from 'react';
import './Home.css';
import MButton from '../../components/MButton/MButton';
import { useHistory } from 'react-router-dom';
import Card from '../../components/Card/Card';
import SergioPic from '../../assets/profile_nobg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import SectionRoller from '../../components/SectionRoller/SectionRoller';

function Home() {
  const history = useHistory();
  const goToCreate = function () {
    history.push('/mapp');
  };

  return (
    <div className="home-wrapper">
      <header className="Home-header" id="start">
        <div className="greeting">
          <h1>A new way to write down your thoughts.</h1>
          <MButton handleClick={goToCreate} label="Start"></MButton>
        </div>
      </header>
      <header id="motivation">
        <div>
          <h2>Motivation</h2>
          <p>
            Sunt mollit esse eu aliquip voluptate exercitation consectetur sunt
            est amet. Eu aliquip pariatur fugiat fugiat. Et laboris veniam quis
            fugiat. Sint mollit ipsum magna amet incididunt consequat anim.
            Magna amet ullamco ipsum occaecat quis culpa Lorem. Dolor
            exercitation veniam dolor consectetur reprehenderit eiusmod pariatur
            incididunt officia irure ex ut occaecat labore. Laboris excepteur
            elit qui mollit nulla qui labore minim id reprehenderit aute elit
            eiusmod. Officia incididunt et sunt consequat. Qui mollit irure amet
            proident. Consectetur minim consectetur nulla eiusmod sint eu dolor.
            Id mollit veniam eiusmod nulla pariatur veniam aliquip laborum.
            Aliqua officia sunt adipisicing ullamco aute fugiat labore id est
            esse culpa ullamco sit. Ut tempor dolore incididunt anim aliqua.
            Cillum velit magna qui laborum deserunt cillum consectetur eiusmod
            excepteur incididunt incididunt ut cupidatat irure. Nisi nulla Lorem
            sint veniam anim dolor veniam. In Lorem aute eiusmod excepteur
            proident occaecat. Magna nostrud laboris quis incididunt proident
            consectetur.
          </p>
          <p>
            Sunt mollit esse eu aliquip voluptate exercitation consectetur sunt
            est amet. Eu aliquip pariatur fugiat fugiat. Et laboris veniam quis
            fugiat. Sint mollit ipsum magna amet incididunt consequat anim.
            Magna amet ullamco ipsum occaecat quis culpa Lorem. Dolor
            exercitation veniam dolor consectetur reprehenderit eiusmod pariatur
            incididunt officia irure ex ut occaecat labore. Laboris excepteur
            elit qui mollit nulla qui labore minim id reprehenderit aute elit
            eiusmod. Officia incididunt et sunt consequat. Qui mollit irure amet
            proident. Consectetur minim consectetur nulla eiusmod sint eu dolor.
            Id mollit veniam eiusmod nulla pariatur veniam aliquip laborum.
            Aliqua officia sunt adipisicing ullamco aute fugiat labore id est
            esse culpa ullamco sit. Ut tempor dolore incididunt anim aliqua.
            Cillum velit magna qui laborum deserunt cillum consectetur eiusmod
            excepteur incididunt incididunt ut cupidatat irure. Nisi nulla Lorem
            sint veniam anim dolor veniam. In Lorem aute eiusmod excepteur
            proident occaecat. Magna nostrud laboris quis incididunt proident
            consectetur.
          </p>
        </div>
      </header>
      <header id="waw">
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
        Check the project on github!
        <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
      </footer>
      <SectionRoller></SectionRoller>
    </div>
  );
}

export default Home;

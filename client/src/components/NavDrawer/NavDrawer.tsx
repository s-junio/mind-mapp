import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import Switcher from "../Switcher/Switcher";

import "./NavDrawer.css";

function NavDrawer(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleActionClick = (ev: React.MouseEvent) => {
    setIsOpen(!isOpen);
    const target = ev.target as HTMLTextAreaElement;
    target.blur();
  };

  const handleSwitcherChange = (ev: any) => {
    props.handleSwitch(ev);
  };

  return (
    <>
      <div className={isOpen ? "navdrawer open" : "navdrawer"}>
        <button className="action-button" onClick={handleActionClick}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        {isOpen && (
          <>
            <div className="user">
              <div className="avatar">
                <FontAwesomeIcon icon={faUserAstronaut} />
              </div>
              <span>s-junio</span>
            </div>
            <div className="links">
              <Link style={{ animationDelay: ".08s" }} to="/">
                Home
              </Link>
              <Link style={{ animationDelay: ".12s" }} to="/projects">
                Projects
              </Link>
              <Link style={{ animationDelay: ".18s" }} to="/mapp">
                New Mapp
              </Link>
            </div>
            <Switcher switchHandler={handleSwitcherChange}></Switcher>
          </>
        )}
      </div>
      {isOpen && <div className="blanket"></div>}
    </>
  );
}

export default NavDrawer;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import Switcher from '../Switcher/Switcher';

import './NavDrawer.css';

function NavDrawer(props: any) {
  type Route = {
    path: string;
    title: string;
    module: string;
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleActionClick = (ev: React.MouseEvent) => {
    setIsOpen(!isOpen);
    const target = ev.target as HTMLTextAreaElement;
    target.blur();
  };

  const handleSwitcherChange = (ev: React.MouseEvent) => {
    props.handleSwitch(ev);
  };

  return (
    <>
      <div className={isOpen ? 'navdrawer open' : 'navdrawer'}>
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
              {props.routes &&
                props.routes.map((route: Route, index: number) => (
                  <Link
                    key={route.path}
                    onClick={handleActionClick}
                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                    to={route.path}
                  >
                    <span>{route.title}</span>
                  </Link>
                ))}
            </div>
            <Switcher switchHandler={handleSwitcherChange}></Switcher>
          </>
        )}
      </div>
      {isOpen && <div className="blanket" onClick={handleActionClick}></div>}
    </>
  );
}

export default NavDrawer;

import React, { useState, useContext } from 'react';
import { UserInfoContext } from '../../UserInfoProvider';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import Switcher from '../Switcher/Switcher';

import './NavDrawer.css';
import UserManager from '../../UserManager';

const UserM = UserManager.Instance;

function NavDrawer(props: any) {
  type Route = {
    path: string;
    title: string;
    module: string;
  };

  const [userInfo, setUserInfo] = useContext(UserInfoContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleActionClick = (ev: React.MouseEvent) => {
    setIsOpen(!isOpen);
    const target = ev.target as HTMLTextAreaElement;
    target.blur();
  };

  const handleSwitcherChange = (ev: React.MouseEvent) => {
    props.handleSwitch(ev);
  };

  const handleLogout = () => {
    UserM.executeLogout();
    setUserInfo({});
  }

  return (
    <>
      <div className={isOpen ? 'navdrawer open' : 'navdrawer'}>
        <button className="action-button" onClick={handleActionClick}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        {isOpen && (
          <>
            <div className="user">
              <div
                className="avatar"
                style={{
                  backgroundImage: `url(${userInfo.avatar})`,
                }}
              >
                {userInfo.avatar ? null : (
                  <FontAwesomeIcon icon={faUserAstronaut} />
                )}
              </div>
              {userInfo.userName ? <span>{userInfo.userName}</span> : null}
            </div>
            <div className="links">
              {props.routes &&
                props.routes.map((route: Route, index: number) => (
                  <>
                    {!userInfo.userName && (route.path === '/profile' || route.path === '/projects') ? null : (
                      <Link
                        key={route.path}
                        onClick={handleActionClick}
                        style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                        to={route.path}
                      >
                        <span>{route.title}</span>
                      </Link>
                    )}
                  </>
                ))}
              {userInfo.userName ? (
                <div className="log-button out" onClick={handleLogout}>
                  Logout
                </div>
              ) : (
                <div className="log-button" onClick={props.handleLogin}>
                  Login
                </div>
              )}
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

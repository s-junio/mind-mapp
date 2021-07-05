import React, { Suspense, lazy, useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Loader from './components/Loader/Loader';
import { Switch, Route, useLocation } from 'react-router-dom';
import UserManager from './UserManager';
import { UserInfoContext } from './UserInfoProvider';

const Home = lazy(() => import('./views/Home/Home'));
const Projects = lazy(() => import('./views/Projects/Projects'));
const Mapp = lazy(() => import('./views/Mapp/Mapp'));
const Profile = lazy(() => import('./views/Profile/Profile'));

const UserManagerInstance = UserManager.Instance;

function App() {
  let location = useLocation();
  const [_, setUserInfo] = useContext(UserInfoContext);

/*   useEffect(() => {
    if (UserManagerInstance.isAuthenticated() &&) {
      UserManagerInstance.getUserInfo().then((userData) => {
        setUserInfo(userData);
      });
    }
  }); */

  return (
    <div className="content">
      <Suspense fallback={<Loader></Loader>}>
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="switch-module"
            timeout={500}
          >
            <Switch location={location}>
              <Route path="/projects" component={Projects}></Route>
              <Route path="/mapp" component={Mapp}></Route>
              <Route path="/profile" component={Profile}></Route>
              <Route path="/" component={Home}></Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Suspense>
    </div>
  );
}
export default App;

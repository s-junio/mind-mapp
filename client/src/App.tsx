import React, { Suspense, lazy } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Loader from './components/Loader/Loader';
import { Switch, Route, useLocation } from 'react-router-dom';
import LoginRegister from './views/LoginRegister/LoginRegister';

const Home = lazy(() => import('./views/Home/Home'));
const Projects = lazy(() => import('./views/Projects/Projects'));
const Mapp = lazy(() => import('./views/Mapp/Mapp'));
const Profile = lazy(() => import('./views/Profile/Profile'));

function App() {
  let location = useLocation();
  return (
    <div className="content">
      <LoginRegister></LoginRegister>
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

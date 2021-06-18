import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { EventHandler, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MButton from '../../components/MButton/MButton';
import MInput, { Valid } from '../../components/MInput/MInput';
import './LoginRegister.css';
import axios from 'axios';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin: React.MouseEventHandler = async (ev) => {
    ev.preventDefault();
    const req = fetch('/projects');
    console.log(req);
    setLoading(true);
  };

  const errorValidRequired: Valid = {
    message: 'This field is required',
    type: 'invalid',
  };
  const valueRequired = (value: string) => {
    if (value === '') {
      return errorValidRequired;
    }
    return true;
  };
  return (
    <form className="auth">
      <MInput
        name="Username"
        required={true}
        validation={valueRequired}
      ></MInput>
      <MInput name="Password" type="password" required={true}></MInput>
      <MButton
        label="Login"
        loading={loading}
        handleClick={handleLogin}
      ></MButton>
    </form>
  );
};

const Register = () => {
  const [loading, setLoading] = useState(false);
  return (
    <form className="auth">
      <MInput name="Username" required={true}></MInput>
      <MInput name="Email" type="email" required={true}></MInput>
      <MInput name="Password" type="password"></MInput>
      <MInput name="Confirm Password" type="password"></MInput>
      <MButton
        label="Register"
        loading={loading}
        handleClick={(ev) => {
          ev.preventDefault();
          setLoading(true);
        }}
      ></MButton>
    </form>
  );
};

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="login-register-wrapper">
      <div className="login-register">
        <TransitionGroup>
          {isLogin && (
            <CSSTransition classNames="log-module" timeout={500}>
              <div>
                <Login></Login>
                <div className="register-message">
                  Don't have an account yet?{' '}
                  <span
                    onClick={() => {
                      setIsLogin(false);
                    }}
                  >
                    Register here
                  </span>
                </div>
              </div>
            </CSSTransition>
          )}
          {!isLogin && (
            <CSSTransition classNames="reg-module" timeout={500}>
              <div>
                <FontAwesomeIcon
                  className="back-arrow"
                  title="Go back to Login"
                  onClick={() => {
                    setIsLogin(true);
                  }}
                  icon={faArrowCircleLeft}
                ></FontAwesomeIcon>
                <Register></Register>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default LoginRegister;

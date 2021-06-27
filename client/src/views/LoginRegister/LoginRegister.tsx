import { faArrowCircleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MButton from '../../components/MButton/MButton';
import MInput, { Valid } from '../../components/MInput/MInput';
import './LoginRegister.css';
import UserManager from '../../UserManager';
import { UserInfoContext } from '../../UserInfoProvider';

const UserManagerInstance = UserManager.Instance;

interface LoginRegisterProps {
  dismissComponent: () => void;
}

const Login: React.FC<LoginRegisterProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [_, setUserInfo] = useContext(UserInfoContext);

  const handleLogin: React.MouseEventHandler = async (ev) => {
    ev.preventDefault();
    setLoading(true);

    try {
      await UserManagerInstance.executeLogin(userName, password);
      setLoading(false);
      const userData = await UserManagerInstance.getUserInfo();
      setUserInfo(userData);
      props.dismissComponent();
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const handleChangeUser = (ev: any) => {
    setUserName(ev.target.value);
  };
  const handleChangePassword = (ev: any) => {
    setPassword(ev.target.value);
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
        value={userName}
        onChange={handleChangeUser}
        validation={valueRequired}
        autoFocus={true}
      ></MInput>
      <MInput
        name="Password"
        type="password"
        required={true}
        value={password}
        onChange={handleChangePassword}
      ></MInput>
      <MButton
        label="Login"
        loading={loading}
        handleClick={handleLogin}
      ></MButton>
    </form>
  );
};

const Register: React.FC<LoginRegisterProps> = (props) => {
  const [_, setUserInfo] = useContext(UserInfoContext);

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const handleUserChange = (ev: any) => {
    setUserName(ev.target.value);
  };
  const handleEmailChange = (ev: any) => {
    setEmail(ev.target.value);
  };
  const handlePasswordChange = (ev: any) => {
    setPassword(ev.target.value);
  };
  const handleConfPasswordChange = (ev: any) => {
    setConfPassword(ev.target.value);
  };

  const handleRegister = async (ev: any) => {
    ev.preventDefault();
    setLoading(true);

    if (password !== confPassword) {
      alert('Passwords do not match');
      setLoading(false);
    } else {
      try {
        const userData = await UserManagerInstance.registerUser({
          userName,
          email,
          password,
        });
        setUserInfo(userData);
        props.dismissComponent();
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <form className="auth">
      <MInput
        name="Username"
        required={true}
        value={userName}
        onChange={handleUserChange}
        autoFocus={true}
      ></MInput>
      <MInput
        name="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      ></MInput>
      <MInput
        name="Password"
        type="password"
        required={true}
        value={password}
        onChange={handlePasswordChange}
      ></MInput>
      <MInput
        name="Confirm Password"
        type="password"
        required={true}
        value={confPassword}
        onChange={handleConfPasswordChange}
      ></MInput>
      <MButton
        label="Register"
        loading={loading}
        handleClick={handleRegister}
      ></MButton>
    </form>
  );
};

const LoginRegister: React.FC<LoginRegisterProps> = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const dismissComponent = () => {
    props.dismissComponent();
  };

  return (
    <div className="login-register-wrapper">
      <div className="login-register">
        <div className="close-window" onClick={dismissComponent}>
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        </div>
        <TransitionGroup>
          {isLogin && (
            <CSSTransition classNames="log-module" timeout={500}>
              <div>
                <Login dismissComponent={dismissComponent}></Login>
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
                <Register dismissComponent={dismissComponent}></Register>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default LoginRegister;

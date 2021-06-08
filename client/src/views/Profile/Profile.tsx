import React, { MouseEventHandler, useState } from 'react';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MInput from '../../components/MInput/MInput';
import './Profile.css';
import MButton from '../../components/MButton/MButton';
import UserManager from '../../UserManager';
import Snackbar, { MessageInfo } from '../../components/Snackbar/Snackbar';

function Profile() {
  const [fetching, setFetching] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState<MessageInfo | null>(null);

  const handleDismiss = () => {
    setSnackbarInfo(null);
  };

  const handleSave: MouseEventHandler<HTMLButtonElement> = (ev) => {
    console.log(ev);
    if (!fetching) {
      setFetching(true);
      window.setTimeout(() => {
        setFetching(false);
        setSnackbarInfo({
          message: 'Saved successfully!',
        });
      }, 3000);
    }
    ev.preventDefault();
  };

  const UserM = UserManager.Instance;

  const userInfo = UserM.getUserInfo();

  return (
    <div className="profile">
      <div className="banner"></div>
      <div
        className="avatar"
        style={{
          backgroundImage: `url(${userInfo.avatar})`,
        }}
      >
        {userInfo.avatar ? null : <FontAwesomeIcon icon={faUserAstronaut} />}
      </div>
      <div className="info">
        <form>
          <div className="form-section">
            <MInput
              id="user"
              name="User"
              defaultValue={userInfo.userName}
              readOnly={true}
            ></MInput>
          </div>
          <div className="form-section row">
            <MInput
              id="fname"
              name="First Name"
              defaultValue={userInfo.firstName}
            ></MInput>
            <MInput
              id="lname"
              name="Last Name"
              defaultValue={userInfo.lastName}
            ></MInput>
            <MInput
              id="bday"
              type="date"
              name="Birthday"
              defaultValue={Date.now()}
            ></MInput>
          </div>
          <div className="form-section row">
            <MInput
              id="email"
              name="E-mail"
              type="email"
              style={{ width: '100%' }}
              defaultValue={userInfo.email}
            ></MInput>
          </div>
          <MButton
            label="Save"
            handleClick={handleSave}
            loading={fetching}
          ></MButton>
        </form>
      </div>
      <div className="objects">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {snackbarInfo ? (
        <Snackbar
          messageInfo={snackbarInfo}
          handleDismiss={handleDismiss}
        ></Snackbar>
      ) : null}
    </div>
  );
}

export default Profile;

import React, { MouseEventHandler, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { faCamera, faUpload, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MInput from '../../components/MInput/MInput';
import './Profile.css';
import MButton from '../../components/MButton/MButton';
import Snackbar, { MessageInfo } from '../../components/Snackbar/Snackbar';
import { UserInfoContext } from '../../UserInfoProvider';
import UserManager from '../../UserManager';

function Profile() {
  const UserM = UserManager.Instance;
  const [userInfo, setUserInfo] = useContext(UserInfoContext);

  const [fetching, setFetching] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState<MessageInfo | null>(null);
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [avatar, setAvatar] = useState(userInfo.avatar);
  const [email, setEmail] = useState(userInfo.email);

  const handleDismiss = () => {
    setSnackbarInfo(null);
  };

  const handleSave: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    ev.preventDefault();
    if (!fetching) {
      setFetching(true);

      const reqPayload: any = {};
      if (firstName !== userInfo.firstName) {
        reqPayload.firstName = firstName;
      }
      if (lastName !== userInfo.lastName) {
        reqPayload.lastName = lastName;
      }
      if (email !== userInfo.email) {
        reqPayload.email = email;
      }
      if (avatar !== userInfo.avatar) {
        reqPayload.avatar = avatar;
      }
      if (Object.keys(reqPayload).length === 0) {
        setSnackbarInfo({
          message: 'No data to save.',
          severity: 'warning',
        });
        setFetching(false);
      } else {
        try {
          const response = await UserM.saveUserInfo(reqPayload);
          setUserInfo(response);
          setSnackbarInfo({
            message: 'Saved successfully!',
          });
        } catch (err) {
          setSnackbarInfo({
            message: err,
            severity: 'error',
          });
        } finally {
          setFetching(false);
        }
      }
    }
  };

  function getBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const uploadPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/gif, image/jpeg';
    input.onchange = async (e: any) => {
      if (e.target) {
        const file = e.target.files[0];
        const base64File = await getBase64(file);
        setAvatar(base64File);
      }
      input.parentNode?.removeChild(input);
    };
    input.click();
  };

  const handleFirstName: React.ChangeEventHandler = (ev: any) => {
    setFirstName(ev.target.value);
  };
  const handleLastName: React.ChangeEventHandler = (ev: any) => {
    setLastName(ev.target.value);
  };
  const handleEmail: React.ChangeEventHandler = (ev: any) => {
    setEmail(ev.target.value);
  };
  return (
    <>
      {!UserM.isAuthenticated() ? (
        <Redirect to="/"></Redirect>
      ) : (
        <div className="profile">
          <input
            id="file-input"
            type="file"
            name="name"
            style={{ display: 'none' }}
          />
          <div className="banner"></div>
          <div
            className="avatar"
            style={{
              backgroundImage: `url(${avatar})`,
            }}
            onClick={uploadPhoto}
          >
            <div className="change-photo" title="Upload new profile picture"><FontAwesomeIcon icon={faCamera} /></div>
            {avatar ? null : <FontAwesomeIcon icon={faUserAstronaut} />}
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
                  value={firstName}
                  onChange={handleFirstName}
                ></MInput>
                <MInput
                  id="lname"
                  name="Last Name"
                  value={lastName}
                  onChange={handleLastName}
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
                  value={email}
                  onChange={handleEmail}
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
      )}
    </>
  );
}

export default Profile;

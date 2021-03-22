import React from "react";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MInput } from "../../components/MInput/MInput";
import "./Profile.css";
import MButton from "../../components/MButton/MButton";
import ProfilePic from "../../assets/profile.jpg";

function Profile() {
  const handleSave = () => {
    alert("saved");
  };

  console.log(faUserAstronaut);
  const profilePic = ProfilePic;

  return (
    <div className="profile">
      <div className="banner"></div>
      <div className="avatar" style={{ backgroundImage: `url(${ProfilePic})` }}>
        {profilePic ? null : <FontAwesomeIcon icon={faUserAstronaut} />}
      </div>
      <div className="info">
        <form>
          <div className="form-section">
            <MInput id="fname" name="First Name"></MInput>
            <MInput id="lname" name="Last Name"></MInput>
            <MInput id="bday" type="date" name="Birthday"></MInput>
          </div>
          <div className="form-section">
            <MInput id="email" name="E-mail" type="email"></MInput>
          </div>
          <div>
            <MInput
              id="user"
              name="User"
              value="s-junio"
              readOnly={true}
            ></MInput>
            <MInput id="password" name="Password" type="password"></MInput>
          </div>
          <MButton label="Save" handleClick={handleSave}></MButton>
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
    </div>
  );
}

export default Profile;

import React, { useContext } from "react";
import { UserContext } from "../App";

import emailImg from "../img/icons/envelope.svg";
import passwordImg from "../img/icons/unlock.svg";
import deleteImg from "../img/icons/garbage.svg";

const Settings = props => {
  const user = useContext(UserContext);

  const renderContent = props => {
    return (
      <main className="settings">
        <div className=" settings__slate small-slate">
          <h1 className="slate__title">Settings</h1>
          <ul className="slate__list">
            <li className="slate__list__item">
              <img className="list__img" src={emailImg} alt="envelope" />
              Change email
            </li>
            <li className="slate__list__item">
              <img className="list__img" src={passwordImg} alt="lock" />
              Change password
            </li>
            <li className="slate__list__item">
              <img className="list__img" src={deleteImg} alt="trashcan" />
              Delete account
            </li>
          </ul>
        </div>
      </main>
    );
  };
  const redirect = () => {
    props.history.push("./");
    return null;
  };
  //renders settings page only if user is logged in
  return user ? renderContent() : redirect();
};

export default Settings;

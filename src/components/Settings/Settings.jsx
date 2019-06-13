import React, { useContext, useState } from "react";
import { UserContext } from "../../App";

import EditEmail from "./EditEmail";
import EditPassword from "./EditPassword";
import ConfirmationModal from "../Modals/ConfirmationModal";
import emailImg from "../../img/icons/envelope.svg";
import passwordImg from "../../img/icons/unlock.svg";
import deleteImg from "../../img/icons/garbage.svg";
import { deleteUser } from "../utilities/utilities";

const Settings = props => {
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const user = useContext(UserContext);

  const deleteAccount = () => {
    deleteUser(user.uid);
  };

  const renderContent = props => {
    return (
      <main className="settings">
        <div className=" settings__slate small-slate">
          <h1 className="slate__title">Settings</h1>
          <ul className="slate__list">
            <button
              className="settings__button"
              onClick={() => setShowEditEmail(true)}
            >
              <li className="slate__list__item">
                <img className="list__img" src={emailImg} alt="envelope" />
                Change email
              </li>
            </button>
            <button
              className="settings__button"
              onClick={() => setShowEditPassword(true)}
            >
              <li className="slate__list__item">
                <img className="list__img" src={passwordImg} alt="lock" />
                Change password
              </li>
            </button>
            <button
              className="settings__button"
              onClick={() => setShowModal(true)}
            >
              <li className="slate__list__item">
                <img className="list__img" src={deleteImg} alt="trashcan" />
                Delete account
              </li>
            </button>
          </ul>
        </div>
        {showEditEmail ? (
          <EditEmail close={() => setShowEditEmail(false)} />
        ) : null}
        {showEditPassword ? (
          <EditPassword close={() => setShowEditPassword(false)} />
        ) : null}
        {showModal ? (
          <ConfirmationModal
            close={() => setShowModal(false)}
            proceed={deleteAccount}
            message="Delete account"
          />
        ) : null}
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

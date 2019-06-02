import React, { useContext, useState } from "react";
import firebase from "../firebase";

import { UserContext } from "../../App";
import { updateUserInDataBase } from "../utilities/updateDatabase";
import quitImg from "../../img/icons/cancel.svg";

//ADD REAUTHORISATION???
const EditEmail = props => {
  const [newEmail, setNewEmail] = useState("");
  const user = useContext(UserContext);

  const handleSubmit = event => {
    event.preventDefault();
    const currentUser = firebase.auth().currentUser;
    currentUser
      .updateEmail(newEmail)
      .then(function() {
        // Update successful.
        try {
          //update the database
          updateUserInDataBase(user.uid, { email: newEmail });
        } catch (error) {
          console.log(error);
        }
        props.close();
      })
      .catch(function(error) {
        console.log(error);
        alert(error.message);
      });
  };

  const handleChange = event => {
    setNewEmail(event.target.value);
  };
  return (
    <div className="background" onClick={() => props.close()}>
      <div className="edit__form">
        <form
          className="form"
          onSubmit={handleSubmit}
          onClick={event => event.stopPropagation()}
        >
          <button className="quit" onClick={() => props.close()}>
            <img src={quitImg} alt="quit" />
          </button>
          <h1 className="form__title">Add your new email</h1>
          <label htmlFor="email">Email:</label>
          <input
            className="form__text-input"
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={newEmail}
            required
          />
          <input className="input__button" type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};

export default EditEmail;

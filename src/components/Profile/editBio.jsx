import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import firebase, { firestore } from "../firebase";

import quitImg from "../../img/icons/cancel.svg";

const EditBio = props => {
  const [bio, setBio] = useState("");
  const context = useContext(UserContext);

  const handleSubmit = event => {
    event.preventDefault();
    firebase.collection("users").context.uid.add();
  };
  const handleChange = event => {
    setBio(event.target.value);
  };
  return (
    <div className="background" onClick={() => props.close()}>
      <div className="edit-bio">
        <form
          className="bio-form form"
          onSubmit={handleSubmit}
          onClick={event => event.stopPropagation()}
        >
          <button className="quit" onClick={() => props.close()}>
            <img src={quitImg} alt="quit" />
          </button>
          <h1 className="bio__title">Add a bio</h1>
          <textarea
            name="bio"
            id="bio"
            onChange={handleChange}
            value={bio}
            maxLength="255"
            placeholder="Introduce yourself to others!"
            required
            autoFocus
            rows="3"
          />
          <input className="input__button" type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};

export default EditBio;

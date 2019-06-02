import React, { useState, useContext } from "react";
import { UserContext } from "../../App";

import { updateUserInDataBase } from "../utilities/updateDatabase";
import quitImg from "../../img/icons/cancel.svg";

const EditBio = props => {
  const [bio, setBio] = useState("");
  const user = useContext(UserContext);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      updateUserInDataBase(user.uid, { bio });
    } catch (error) {
      console.log(error);
    }
    props.close();
  };
  const handleChange = event => {
    setBio(event.target.value);
  };
  return (
    <div className="background" onClick={() => props.close()}>
      <div className="edit__form">
        <form
          className="form"
          onSubmit={handleSubmit}
          onClick={event => event.stopPropagation()}
        >
          <button type="button" className="quit" onClick={() => props.close()}>
            <img src={quitImg} alt="quit" />
          </button>
          <h1 className="form__title">Add a bio</h1>
          <textarea
            className="form__textarea"
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

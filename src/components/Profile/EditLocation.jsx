import React, { useState, useContext } from "react";
import { UserContext } from "../../App";

import {
  updateUserInDataBase,
  updatePetInDataBase
} from "../utilities/updateDatabase";
import quitImg from "../../img/icons/cancel.svg";
import { firestore } from "../firebase";

const EditLocation = props => {
  const [location, setLocation] = useState("");
  const user = useContext(UserContext);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      updateUserInDataBase(user.uid, { location });

      firestore
        .collection("users")
        .doc(user.uid)
        .collection("pets")
        .get()
        .then(snapshot => {
          snapshot.forEach(pet => {
            updatePetInDataBase(user.uid, pet.id, { location });
          });
        });
    } catch (error) {
      console.log(error);
    }
    props.close();
  };
  const handleChange = async event => {
    setLocation(event.target.value);
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
          <h1 className="form__title">Add a location</h1>
          <label htmlFor="location">Location:</label>
          <input
            className="form__text-input"
            type="text"
            name="location"
            id="location"
            onChange={handleChange}
            value={location}
            required
          />
          <input className="input__button" type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};

export default EditLocation;

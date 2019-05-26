import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import firebase, { firestore, storage } from "../firebase";

import quitImg from "../../img/icons/cancel.svg";

const EditPicture = props => {
  const [image, setImage] = useState("");
  const user = useContext(UserContext);

  const handleSubmit = async event => {
    //OLD FILE WILL NOT BE OVERWRITTEN IF IT WAS A DIFFERENT EXTENSION
    event.preventDefault();
    const fileType = image[0].name.split(".").pop();
    const storageRef = storage.ref(`images/users/${user.uid}.${fileType}`);
    //adds the picture at the specified reference/place
    await storageRef.put(image[0]);
    const pictureImg = await storageRef.getDownloadURL();

    const userRef = firestore.collection("users").doc(user.uid);
    //adds a reference to the picture in user doc
    await userRef.set(
      {
        img: pictureImg
      },
      { merge: true }
    );
    props.close();
  };
  const handleChange = event => {
    setImage(event.target.files);
  };
  return (
    <div className="background" onClick={() => props.close()}>
      <div className="edit__form">
        <form
          className="form"
          onSubmit={event => handleSubmit(event)}
          onClick={event => event.stopPropagation()}
        >
          <button className="quit" onClick={() => props.close()}>
            <img src={quitImg} alt="quit" />
          </button>
          <h1 className="form__title">Select a picture</h1>

          <input
            type="file"
            name="pictureFile"
            id="pictureFile"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            required
          />
          <p className="form__text">Please, choose a jpg or png file.</p>
          <input className="input__button" type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};

export default EditPicture;

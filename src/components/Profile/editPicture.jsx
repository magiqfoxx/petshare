import React, { useState, useContext } from "react";
import { UserContext } from "../../App";

import FormError from "../Landing/FormError";
import { uploadUserImg } from "../utilities/addToStorage";
import quitImg from "../../img/icons/cancel.svg";

const EditPicture = props => {
  const [image, setImage] = useState("");
  const [imageTooLarge, setImageTooLarge] = useState(false);
  const user = useContext(UserContext);

  const handleSubmit = async event => {
    //OLD FILE WILL NOT BE OVERWRITTEN IF IT WAS A DIFFERENT EXTENSION
    event.preventDefault();
    if (image) {
      try {
        uploadUserImg(user.uid, image);
      } catch (error) {
        console.log(error);
      }

      props.close();
    }
  };
  const handleChange = event => {
    if (event.target.files) {
      if (event.target.files[0].size > 2000000) {
        setImageTooLarge(true);
      } else {
        setImage(event.target.files);
      }
    }
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
          {imageTooLarge ? <FormError message="Image is too large" /> : null}
          <p className="form__text">Please, choose a jpg or png file.</p>
          <input className="input__button" type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};

export default EditPicture;

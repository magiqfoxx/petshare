import React, { useState } from "react";

import quitImg from "../../img/icons/cancel.svg";

const EditBio = props => {
  const [bio, setBio] = useState("");
  const handleSubmit = event => {
    event.preventDefault();
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
          <h1 className="bio__title">Select a picture</h1>
          <input type="file" name="pictureFile" id="pictureFile" required />
          <input className="input__button" type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};

export default EditBio;

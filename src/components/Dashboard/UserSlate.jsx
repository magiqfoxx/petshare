import React, { useState, useContext } from "react";
import Modal from "../Modals/Modal";

const Pet = props => {
  const [enlargeImg, setEnlargeImg] = useState(false);

  return (
    <div className=" user-slate">
      <img
        className="user-slate__image"
        src={props.img}
        alt="pet"
        onClick={() => setEnlargeImg(true)}
      />
      <div className="user-slate__bolded">
        <h3 className="user-slate___name">{props.name}</h3>
        <span className="user-slate___location">{props.location}, </span>
      </div>
      <p className="user-slate__bio">{props.bio}</p>
      {enlargeImg && (
        <Modal
          component={
            <div className="background" onClick={() => setEnlargeImg(false)}>
              <img className="modal__image" src={props.img} />
            </div>
          }
        />
      )}
    </div>
  );
};

export default Pet;

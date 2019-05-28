import React, { useState, useContext } from "react";
import { UserContext } from "../../App";

import { removePet } from "../utilities/utilities";
import editImg from "../../img/icons/edit.svg";
import deleteImg from "../../img/icons/garbage.svg";

const Pet = props => {
  const [showMessage, setShowMessage] = useState(false);
  const user = useContext(UserContext);

  //render Modal with: Are you sure you want to delete?
  //showMessage onClick => deletePet
  const deletePet = () => {
    try {
      removePet(user.uid, props.uid);
    } catch (error) {
      console.log(error);
    }
  };
  //send to parent to populate the form
  const petObj = { ...props };
  return (
    <div className="pet pet-slate">
      <img className="pet__image" src={props.img} alt="" />
      {props.editable ? (
        <button className="delete" onClick={deletePet}>
          <img className="delete__img" src={deleteImg} alt="delete" />
        </button>
      ) : null}
      <div className="pet__bolded">
        <h3 className="pet__name">{props.name}</h3>
        <span className="pet__species">{props.species}, </span>
        <span className="pet__age">age: {props.age}</span>
        {props.editable ? (
          <button className="edit" onClick={e => props.edit(e, petObj)}>
            <img className="edit__img" src={editImg} alt="edit" />
          </button>
        ) : null}
      </div>
      <p className="pet__description">{props.description}</p>
    </div>
  );
};

export default Pet;

import React, { useState } from "react";

import editImg from "../../img/icons/edit.svg";

const Pet = props => {
  const petObj = { ...props };
  return (
    <div className="pet pet-slate">
      <img className="pet__image" src={props.img} alt="" />
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

import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";

import ConfirmationPopUp from "../Modals/ConfirmationPopup";
import Modal from "../Modals/Modal";
import { removePet } from "../utilities/utilities";
import { addPetToLikes, removePetFromLikes } from "../utilities/updateDatabase";
import editImg from "../../img/icons/edit.svg";
import deleteImg from "../../img/icons/garbage.svg";
import likeImg from "../../img/icons/heart.svg";

const Pet = props => {
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [enlargeImg, setEnlargeImg] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {}, [props]);
  const deletePet = () => {
    try {
      removePet(user.uid, props.uid);
    } catch (error) {
      console.log(error);
    }
  };
  const addToLikes = () => {
    const pet = {
      img: props.img,
      name: props.name,
      age: props.age,
      id: props.uid,
      owner: props.owner
    };
    addPetToLikes(user.uid, props.owner.id, props.uid, pet);
  };
  const removeFromLikes = () => {
    //RELIES ON THE FACT THAT THE PET OBJECT WILL NOT CHANGE
    //TERRIBLE IDEA
    removePetFromLikes(user.uid, props.owner.id, props.uid, props);
  };
  //send to parent to populate the form
  const petObj = { ...props };
  return (
    <div className="pet pet-slate">
      <img
        className="pet__image"
        src={props.img}
        alt="pet"
        onClick={() => setEnlargeImg(true)}
      />
      {props.editable ? (
        <button className="delete" onClick={() => setShowDeleteMessage(true)}>
          <img className="delete__img" src={deleteImg} alt="delete" />
        </button>
      ) : props.likedBy && props.likedBy.includes(user.uid) ? (
        <button className="like liked" onClick={removeFromLikes}>
          <img
            className="like__img"
            src={likeImg}
            alt="add to likes"
            title="remove from likes"
          />
        </button>
      ) : (
        <button className="like" onClick={addToLikes}>
          <img
            className="like__img"
            src={likeImg}
            alt="add to likes"
            title="add to like"
          />
        </button>
      )}
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
      {enlargeImg && (
        <Modal
          component={
            <div className="background" onClick={() => setEnlargeImg(false)}>
              <img className="modal__image" src={props.img} alt={props.name} />
            </div>
          }
        />
      )}
      {showDeleteMessage && (
        <Modal
          component={
            <ConfirmationPopUp
              close={() => setShowDeleteMessage(false)}
              proceed={deletePet}
            />
          }
        />
      )}
    </div>
  );
};

export default Pet;

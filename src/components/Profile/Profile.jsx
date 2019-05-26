import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { storage } from "../firebase.js";

import EditBio from "./EditBio";
import EditPicture from "./EditPicture";
import EditNewPet from "./EditNewPet";
import Pet from "./Pet";

import userImg from "../../img/icons/profile.svg";
import editImg from "../../img/icons/edit.svg";
import addImg from "../../img/icons/add.svg";

const Profile = props => {
  const [showEditBio, setEditBio] = useState(false);
  const [showEditPicture, setEditPicture] = useState(false);
  const [showEditNewPet, setEditNewPet] = useState(false);
  const user = useContext(UserContext);
  console.log(user);
  const renderBio = () => {
    return (
      user.bio ||
      `I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.” 
― Maya Angelou`
    );
  };
  const pictureSrc = () => {
    return user.img || userImg;
  };
  const renderPets = () => {
    if (user.allPets && user.allPets.length > 0) {
      return user.allPets.map((pet, index) => {
        if (index < user.allPets.length - 1) {
          return PetComponent(pet);
        } else {
          return [PetComponent(pet), addANewPet];
        }
      });
    } else {
      return addANewPet;
    }
  };
  const PetComponent = pet => {
    return (
      <Pet
        key={pet.petId}
        img={pet.img}
        name={pet.name}
        species={pet.species}
        age={pet.age}
        description={pet.description}
      />
    );
  };

  const addANewPet = (
    <div className="pet pet-slate" onClick={() => setEditNewPet(true)}>
      <img className="pet__image add-pet" src={addImg} alt="add" />
      <span>Add a new pet!</span>
    </div>
  );

  const renderContent = () => {
    return (
      <main className="profile">
        <div className="user">
          <div className="user__image small-slate">
            <img src={pictureSrc()} alt="user" />
            <button className="edit" onClick={() => setEditPicture(true)}>
              <img className="edit__img" src={editImg} alt="edit" />
            </button>
            <h3 className="user__name">{user.name}</h3>
          </div>
          <div className="user__bio small-slate">
            <button className="edit" onClick={() => setEditBio(true)}>
              <img className="edit__button" src={editImg} alt="edit" />
            </button>
            <p>{renderBio()}</p>
          </div>
        </div>
        <div className="user-pets small-slate">
          <h2 className="user-pets__title">Pets</h2>
          <div className="pets">{renderPets()}</div>
        </div>
        {showEditBio ? <EditBio close={() => setEditBio(false)} /> : null}
        {showEditPicture ? (
          <EditPicture close={() => setEditPicture(false)} />
        ) : null}
        {showEditNewPet ? (
          <EditNewPet close={() => setEditNewPet(false)} />
        ) : null}
      </main>
    );
  };
  const redirect = () => {
    props.history.push("./");
    return null;
  };

  //renders profile page only if user is logged in
  return user ? renderContent() : redirect();
};

export default Profile;

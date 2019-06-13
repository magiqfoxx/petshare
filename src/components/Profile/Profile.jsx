import React, { useContext, useState } from "react";
import { UserContext } from "../../App";

import EditBio from "./EditBio";
import EditPicture from "./EditPicture";
import EditLocation from "./EditLocation";
import EditNewPet from "./EditNewPet";
import EditPet from "./EditPet";
import Pet from "./Pet";
import Posts from "./Posts";

import userImg from "../../img/icons/profile.svg";
import editImg from "../../img/icons/edit.svg";
import addImg from "../../img/icons/add.svg";
import locationImg from "../../img/icons/placeholder.svg";

const Profile = props => {
  const [showEditBio, setShowEditBio] = useState(false);
  const [showEditPicture, setShowEditPicture] = useState(false);
  const [showEditNewPet, setShowEditNewPet] = useState(false);
  const [showEditLocation, setShowEditLocation] = useState(false);
  const [showEditPet, setShowEditPet] = useState(false);

  const user = useContext(UserContext);

  const renderBio = () => {
    return (
      user.bio ||
      `I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.” 
― Maya Angelou`
    );
  };
  const renderLocation = () => {
    return user.location || `Add location`;
  };
  const renderPictureSrc = () => {
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
        edit={(e, petObj) => {
          setShowEditPet(petObj);
        }}
        editable={true}
        key={pet.id}
        img={pet.img}
        name={pet.name}
        species={pet.species}
        age={pet.age}
        description={pet.description}
        uid={pet.id}
      />
    );
  };

  const addANewPet = (
    <div
      className="pet pet-slate"
      onClick={() => setShowEditNewPet(true)}
      key="000"
    >
      <img className="pet__image add-pet" src={addImg} alt="add" />
      <span className="add-pet__text">Add a new pet!</span>
    </div>
  );

  const renderContent = () => {
    return (
      <main className="profile">
        <div className="user">
          <div className="user__image small-slate">
            <img src={renderPictureSrc()} alt="user" />
            <button className="edit" onClick={() => setShowEditPicture(true)}>
              <img className="edit__img" src={editImg} alt="edit" />
            </button>
            <h3 className="user__name">{user.name}</h3>

            <span className="user__location">{renderLocation()}</span>
            <img
              className="icon location-icon"
              src={locationImg}
              alt="location"
              onClick={() => setShowEditLocation(true)}
            />
          </div>
          <div className="user__bio small-slate">
            <button className="edit" onClick={() => setShowEditBio(true)}>
              <img className="edit__button" src={editImg} alt="edit" />
            </button>
            <p>{renderBio()}</p>
          </div>
        </div>
        <div className="user-pets small-slate">
          <h2 className="user-pets__title">Pets</h2>
          <div className="pets">{renderPets()}</div>
        </div>
        <Posts user={user} />
        {showEditBio ? <EditBio close={() => setShowEditBio(false)} /> : null}
        {showEditPicture ? (
          <EditPicture close={() => setShowEditPicture(false)} />
        ) : null}
        {showEditLocation ? (
          <EditLocation close={() => setShowEditLocation(false)} />
        ) : null}
        {showEditNewPet ? (
          <EditNewPet close={() => setShowEditNewPet(false)} />
        ) : null}
        {showEditPet ? (
          <EditPet close={() => setShowEditPet(false)} pet={showEditPet} />
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

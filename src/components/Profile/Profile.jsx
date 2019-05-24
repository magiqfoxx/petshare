import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../App";
import firebase, { firestore } from "../firebase";

import EditBio from "./EditBio";
import EditPicture from "./EditPicture";
import Pet from "./Pet";
import { pets } from "../fakePets";

import userImg from "../../img/icons/profile.svg";
import editImg from "../../img/icons/edit.svg";

const Profile = props => {
  const [showEditBio, setEditBio] = useState(false);
  const [showEditPicture, setEditPicture] = useState(false);
  const context = useContext(UserContext);

  const renderContent = () => {
    return (
      <main className="profile">
        <div className="user">
          <div className="user__image small-slate">
            <img src={userImg} alt="user" />
            <button className="edit" onClick={() => setEditPicture(true)}>
              <img className="edit__img" src={editImg} alt="edit" />
            </button>
            <h2 />
          </div>
          <div className="user__bio small-slate">
            <button className="edit" onClick={() => setEditBio(true)}>
              <img className="edit__button" src={editImg} alt="edit" />
            </button>
            <p>
              {firestore.collection("users").doc(context.uid).bio ||
                `Bench mark please use 'solutionise' instead of solution ideas! or
          vertical integration bake it in yet blue sky thinking we need more
          paper create spaces to explore what’s next. Ramp up. Push back those
          options are already baked in with this model cannibalize I just wanted
          to give you a heads-up, but your work on this project has been really
          impactful gain traction diversify kpis.`}
            </p>
          </div>
        </div>
        <div className="user-pets small-slate">
          <h2 className="user-pets__title">Pets</h2>
          <div className="pets">
            {pets.map(pet => {
              return (
                <Pet
                  key={pet.id}
                  img={pet.img}
                  name={pet.name}
                  species={pet.species}
                  age={pet.age}
                  description={pet.description}
                />
              );
            })}
          </div>
        </div>
        {showEditBio ? <EditBio close={() => setEditBio(false)} /> : null}
        {showEditPicture ? (
          <EditPicture close={event => setEditPicture(false)} />
        ) : null}
      </main>
    );
  };
  const redirect = () => {
    props.history.push("./");
    return null;
  };

  //renders profile page only if user is logged in
  return context ? renderContent() : redirect();
};

export default Profile;

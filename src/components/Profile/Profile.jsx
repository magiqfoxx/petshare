import React, { useEffect } from "react";

import Pet from "./Pet";
import { pets } from "../fakePets";

import userImg from "../../img/icons/profile.svg";
import editImg from "../../img/icons/edit.svg";

const Profile = props => {
  /*useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  }, []);*/

  return (
    <main className="profile">
      <div className="user slate">
        <div className="user__image small-slate">
          <img src={userImg} alt="user" />
          <img className="edit" src={editImg} alt="edit" />
        </div>
        <div className="user__bio small-slate">
          <img class="edit" src={editImg} alt="edit" />
          Bench mark please use "solutionise" instead of solution ideas! :) or
          vertical integration bake it in yet blue sky thinking we need more
          paper create spaces to explore what’s next. Ramp up. Push back those
          options are already baked in with this model cannibalize I just wanted
          to give you a heads-up, but your work on this project has been really
          impactful gain traction diversify kpis.
        </div>
      </div>
      <div className="user-pets slate">
        <h2 className="user-pets__title small-slate">Pets</h2>
        <div className="pets small-slate">
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
    </main>
  );
};

export default Profile;

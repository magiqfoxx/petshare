import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";

import Posts from "./Posts";
import Pet from "./Pet";

const UserProfile = props => {
  const [user, setUser] = useState({});
  const [pets, setPets] = useState([]);
  useEffect(() => {
    const userID = props.match.params.id;

    const userRef = firestore.collection("users").doc(userID);
    userRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          setUser(doc.data());
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });

    let allPets = [];
    const petsRef = firestore
      .collection("users")
      .doc(userID)
      .collection("pets");

    petsRef
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          allPets.push(doc.data());
        });
        setPets(allPets);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }, []);

  const renderPets = () => {
    if (pets.length > 0) {
      return pets.map(pet => {
        return (
          <Pet
            key={pet.id}
            img={pet.img}
            name={pet.name}
            species={pet.species}
            age={pet.age}
            description={pet.description}
            uid={pet.id}
          />
        );
      });
    }
  };
  const renderContent = () => {
    return (
      <main className="profile">
        <div className="user">
          <div className="user__image small-slate">
            <img src={user.img} alt="user" />
            <h3 className="user__name">{user.name}</h3>
            <span className="user__location">{user.location}</span>
          </div>
          <div className="user__bio small-slate">
            <p>{user.bio}</p>
          </div>
        </div>
        <div className="user-pets small-slate">
          <h2 className="user-pets__title">Pets</h2>
          <div className="pets">{renderPets()}</div>
        </div>
        <Posts user={user} />
      </main>
    );
  };
  return renderContent();
};

export default UserProfile;

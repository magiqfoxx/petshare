import React, { useEffect, useState, useContext } from "react";
import { firestore } from "../firebase";
import { UserContext } from "../../App";

import Posts from "./Posts";
import Pet from "./Pet";
import {
  addUserToFollowed,
  removeUserFromFollowed
} from "../utilities/updateDatabase";
import followImg from "../../img/icons/favorite.svg";

const UserProfile = props => {
  const [pageUser, setPageUser] = useState({});
  const [pets, setPets] = useState([]);
  const user = useContext(UserContext);
  useEffect(() => {
    const userID = props.match.params.id;

    const userRef = firestore.collection("users").doc(userID);
    userRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          setPageUser(doc.data());
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
  const addToFollowed = () => {
    addUserToFollowed(user.uid, pageUser.uid);
  };
  const removeFromFollowed = () => {
    removeUserFromFollowed(user.uid, pageUser.uid);
  };
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
            <img src={pageUser.img} alt="user" />
            <h3 className="user__name">{pageUser.name}</h3>
            <span className="user__location">{pageUser.location}</span>
            {user && user.followed && user.followed.includes(pageUser.uid) ? (
              <button className="follow followed" onClick={removeFromFollowed}>
                <img
                  className="follow__img"
                  src={followImg}
                  alt="follow"
                  title="remove from followed"
                />
              </button>
            ) : (
              <button className="follow" onClick={addToFollowed}>
                <img
                  className="follow__img"
                  src={followImg}
                  alt="follow"
                  title="remove from followed"
                />
              </button>
            )}
          </div>
          <div className="user__bio small-slate">
            <p>{pageUser.bio}</p>
          </div>
        </div>
        <div className="user-pets small-slate">
          <h2 className="user-pets__title">Pets</h2>
          <div className="pets">{renderPets()}</div>
        </div>
        <Posts user={pageUser} />
      </main>
    );
  };
  return renderContent();
};

export default UserProfile;

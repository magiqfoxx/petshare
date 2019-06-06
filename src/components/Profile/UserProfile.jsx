import React, { useEffect, useState, useContext } from "react";
import { firestore } from "../firebase";
import { UserContext } from "../../App";

import Loading from "../Loading";
import Posts from "./Posts";
import Pet from "./Pet";
import {
  addUserToFollowed,
  removeUserFromFollowed
} from "../utilities/updateDatabase";
import followImg from "../../img/icons/favorite.svg";

const UserProfile = props => {
  const [pageUser, setPageUser] = useState(null);
  const [pets, setPets] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    const userID = props.match.params.id;

    const userRef = firestore.collection("users").doc(userID);
    userRef.onSnapshot(doc => {
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        setPageUser(doc.data());
      }
    });

    const petsRef = firestore
      .collection("users")
      .doc(userID)
      .collection("pets");

    petsRef.onSnapshot(snapshot => {
      let allPets = [];
      snapshot.forEach(doc => {
        allPets.push(doc.data());
      });
      setPets(allPets);
    });
  }, []);

  const addToFollowed = () => {
    if (user.uid !== pageUser.uid) {
      const userToFollow = {
        uid: pageUser.uid,
        name: pageUser.name,
        img: pageUser.img
      };
      addUserToFollowed(user.uid, pageUser.uid, userToFollow);
    }
  };
  const removeFromFollowed = () => {
    //RELIES ON THE FACT THAT THE PAGE USER OBJECT WILL NOT CHANGE
    //TERRIBLE IDEA
    removeUserFromFollowed(user.uid, pageUser.uid, pageUser);
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
            likedBy={pet.likedBy}
            owner={pet.owner}
          />
        );
      });
    }
  };
  const renderContent = () => {
    if (pageUser && user) {
      return (
        <main className="profile">
          <div className="user">
            <div className="user__image small-slate">
              <img src={pageUser.img} alt="user" />
              <h3 className="user__name">{pageUser.name}</h3>
              <span className="user__location">{pageUser.location}</span>
              {pageUser.followedBy && pageUser.followedBy.includes(user.uid) ? (
                <button
                  className="follow followed"
                  onClick={removeFromFollowed}
                >
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
    } else {
      return <Loading />;
    }
  };
  return renderContent();
};

export default UserProfile;

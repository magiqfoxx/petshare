import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { firestore } from "../firebase.js";

import Pet from "../Profile/Pet";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    setFavorites(user.favorites);
    /*const query = firestore
      .users(user.uid)
      .doc("favorites")
      .get()
      .then(results => {
        if (results.length > 0) {
          setFavorites(results.data());
        } else {
          setFavorites("Sorry. No pets matched your query");
        }
      });*/
  }, []);

  const renderFavorites = () => {
    if (favorites) {
      return favorites.map(pet => {
        <Pet name={pet.name} image={pet.img} />;
      });
    }
  };
  return <div className="favorites">{renderFavorites()}</div>;
};

export default Favorites;

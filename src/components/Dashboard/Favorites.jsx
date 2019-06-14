import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";

import DashboardSlate from "./DashboardSlate";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const user = useContext(UserContext);
  console.log(user);
  useEffect(() => {
    setFavorites(user.likes);
  }, [user]);
  const renderFavorites = () => {
    if (favorites) {
      return favorites.map(pet => {
        return (
          <DashboardSlate
            key={pet.id}
            image={pet.img}
            name={pet.name}
            id={pet.owner.id}
          />
        );
      });
    }
  };
  return (
    <div className="favorites small-slate">
      <h3>Favorite Pets</h3>
      <div className="favorites-list">{renderFavorites()}</div>
    </div>
  );
};

export default Favorites;

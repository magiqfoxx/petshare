import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { firestore } from "../firebase";
import { geohashGetNeighbours } from "../utilities/geoHash";

import Pet from "../Profile/Pet";

const Results = props => {
  const [pets, setPets] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    if (user && user.coords) {
      console.log(user);
      const userGeohash = user.coords.geohash;
      const geo = geohashGetNeighbours(userGeohash);
      let geohashes = [...Object.values(geo)].sort();

      firestore
        .collectionGroup("pets")
        .orderBy("geohash")
        .startAt(geohashes[0])
        //.endAt(geohashes[7])
        .limit(3)
        .get()
        .then(snapshot => {
          let responsePets = [];
          snapshot.forEach(response => {
            console.log(response.data());
            responsePets.push(response.data());
          });
          setPets(responsePets);
        });
    }
  }, user);
  //CANNOT USE USER???
  const renderPets = () => {
    console.log(pets);
    return pets.map(pet => {
      return (
        <Pet
          key={pet.id}
          img={pet.img}
          name={pet.name}
          species={pet.species}
          age={pet.age}
          description={pet.description}
          id={pet.id}
        />
      );
    });
  };
  return <div className="search__results small-slate">{renderPets()}</div>;
};

export default Results;

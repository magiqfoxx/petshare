import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { firestore } from "../firebase";
import { geohashGetNeighbours } from "../utilities/geoHash";

import Pet from "../Profile/Pet";

const Results = props => {
  const [pets, setPets] = useState([]);
  const [place, setPlace] = useState("nearby");
  const user = useContext(UserContext);

  useEffect(() => {
    if (props.pets.length < 1) {
      if (user && user.coords) {
        const userGeohash = user.coords.geohash;
        //const geo = geohashGetNeighbours(userGeohash);
        //i'm making the area much broader
        const geo = geohashGetNeighbours(userGeohash.slice(0, 3));
        let geohashes = [...Object.values(geo)].sort();
        const startAt = geohashes[0];
        const endAt = geohashes[7];
        firestore
          .collectionGroup("pets")
          .orderBy("geohash")
          .startAt(startAt)
          .endAt(endAt)
          //.limit(3)
          .get()
          .then(snapshot => {
            let responsePets = [];
            snapshot.forEach(response => {
              responsePets.push(response.data());
            });
            setPets(responsePets);
          });
      }
    } else {
      setPets(props.pets);
    }
  }, [user]);

  const renderPets = () => {
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
  };
  return (
    <div className="search__results small-slate">
      <h2>Pets {place}...</h2>
      <div className="results-grid">{renderPets()}</div>
    </div>
  );
};

export default Results;

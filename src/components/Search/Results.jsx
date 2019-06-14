import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { firestore } from "../firebase";
import { geohashGetNeighbours } from "../utilities/geoHash";

import Pet from "../Profile/Pet";

const Results = props => {
  const [pets, setPets] = useState([]);
  const [place, setPlace] = useState("nearby");
  const [message, setMessage] = useState("");
  const user = useContext(UserContext);

  useEffect(() => {
    if (props.pets.length < 1 && pets.length < 1) {
      if (user && user.coords) {
        const userGeohash = user.coords.geohash;
        //i'm making the area very broad so that something always shows up
        const geo = geohashGetNeighbours(userGeohash.slice(0, 3));
        let geohashes = [...Object.values(geo)].sort();
        const startAt = geohashes[0];
        const endAt = geohashes[7];
        firestore
          .collectionGroup("pets")
          .orderBy("geohash")
          .startAt(startAt)
          .endAt(endAt)
          .limit(9)
          .get()
          .then(snapshot => {
            let responsePets = [];
            snapshot.forEach(response => {
              responsePets.push(response.data());
            });

            setPets(responsePets);
            setMessage("");
          });
      } else {
        setMessage("You have to provide your geolocation");
      }
    } else {
      if (props.place) {
        setPlace(props.place);
      }
      setPets(props.pets);
      setMessage("");
    }
  }, [user, props.pets, props.place, pets.length]);

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
      <div className="results-grid">
        {renderPets()}
        <p className="small-text">{message}</p>
      </div>
    </div>
  );
};

export default Results;

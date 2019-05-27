import React, { useState, useEffect } from "react";

import Pet from "../Profile/Pet";
import { firestore } from "../firebase";

const Results = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const petsRef = firestore.collection("pets");

    //grab all the pet data from the database
    //and listen for changes (snapshot)
    //collection.onSnapshot returns unsubscribe
    return petsRef.onSnapshot(petsInDB => {
      const allPets = [];
      petsInDB.forEach(pet => {
        console.log(pet.data());
        allPets.push({ id: pet.id, ...pet.data() });
      });
      setPets(state => {
        return { ...state }, allPets;
      });
    });
  }, []);

  return (
    <div className="search__results small-slate">
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
  );
};

export default Results;

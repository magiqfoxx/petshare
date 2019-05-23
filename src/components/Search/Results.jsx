import React from "react";

import Pet from "../Profile/Pet";
import { pets } from "../fakePets";

const Results = () => {
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

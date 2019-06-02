import React, { useState, useEffect } from "react";

import Pet from "../Profile/Pet";

const Results = props => {
  return (
    <div className="search__results small-slate">
      {Array.isArray(props.pets) ? (
        props.pets.map(pet => {
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
        })
      ) : (
        <p>{props.pets}</p>
      )}
    </div>
  );
};

export default Results;

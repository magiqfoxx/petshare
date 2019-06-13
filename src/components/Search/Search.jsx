import React, { useState } from "react";

import SearchBar from "./SearchBar";
import Results from "./Results";
import Filter from "./Filter";

import { firestore } from "../firebase";

const Search = () => {
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState(0);
  const [pets, setPets] = useState([]);
  const [location, setLocation] = useState("");

  const handleSubmit = async (event, location) => {
    event.preventDefault();
    let query;
    if (location) {
      setLocation(location);
    }
    //get coords for place from api
    //const coords = await getCoords(location);
    //show loader before the window closes
    //const geohash = geohashEncode(coords.lat, coords.lon, 5);
    if (location) {
      query = firestore
        .collectionGroup("pets")
        .where("location", "==", location);
    } else if (species) {
      query = firestore.collectionGroup("pets").where("species", "==", species);
    } else if (age) {
      console.log("age");
      query = firestore.collectionGroup("pets").where("age", "==", age);
    }
    let results = [];
    query.get().then(function(querySnapshot) {
      querySnapshot.forEach(doc => {
        results.push(doc.data());
      });
      if (results.length > 0) {
        console.log(results);
        setPets(results);
      } else {
        setPets("Sorry. No pets matched your query");
      }
    });
  };

  return (
    <main className="search">
      <SearchBar handleSubmit={handleSubmit} />
      <Filter
        species={species}
        setSpecies={value => setSpecies(value)}
        age={age}
        setAge={value => setAge(value)}
        submit={handleSubmit}
      />
      <Results pets={pets} place={location} />
    </main>
  );
};

export default Search;

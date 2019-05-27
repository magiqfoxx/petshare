import React, { useState } from "react";

import SearchBar from "./SearchBar";
import Results from "./Results";
import Filter from "./Filter";

const Search = () => {
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState(0);

  const submit = () => {};
  return (
    <main className="search">
      <SearchBar />
      <Filter
        species={species}
        setSpecies={value => setSpecies(value)}
        age={age}
        setAge={value => setAge(value)}
        submit={submit}
      />
      <Results />
    </main>
  );
};

export default Search;

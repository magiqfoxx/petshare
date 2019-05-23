import React from "react";

import SearchBar from "./SearchBar";
import Results from "./Results";

const Search = () => {
  return (
    <main className="search">
      <SearchBar />
      <Results />
    </main>
  );
};

export default Search;

import React, { useState } from "react";

import filterImg from "../../img/icons/settings2.svg";

const Filter = props => {
  const [filterExpanded, setFilterExpanded] = useState(false);

  return (
    <div className="filter">
      <button
        className="icon--button"
        onClick={() => setFilterExpanded(!filterExpanded)}
      >
        <img className="icon" src={filterImg} alt="filter" />
      </button>
      {filterExpanded ? (
        <form className="filter__form" onSubmit={e => props.submit(e)}>
          <label className="filter__label" htmlFor="species">
            Species
          </label>
          <input
            className="search__input"
            list="speciess"
            id="species"
            name="species"
            onChange={e => {
              props.setSpecies(e.target.value);
              props.setAge("");
            }}
          />

          <datalist id="speciess">
            <option value="dog" />
            <option value="cat" />
            <option value="reptile" />
            <option value="rodent" />>
            <option value="bird" />
          </datalist>
          <label className="filter__label" htmlFor="age">
            Age
          </label>
          <input
            className="search__input "
            type="text"
            name="age"
            id="age"
            value={props.age}
            onChange={e => {
              props.setAge(e.target.value);
              props.setSpecies("");
            }}
          />
          <input className="search__button" type="reset" value="Reset" />
          <input className="search__button" type="submit" value="Submit" />
        </form>
      ) : null}
    </div>
  );
};

export default Filter;

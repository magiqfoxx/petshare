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
        <form className="filter__form" onSubmit={props.submit}>
          <label className="filter__label" htmlFor="species">
            Species
          </label>
          <input
            className="filter__input"
            list="speciess"
            id="species"
            name="species"
            onChange={e => props.setSpecies(e.target.value)}
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
            className="filter__input"
            type="range"
            name="age"
            id="age"
            min="0"
            max="15"
            value={props.age}
            onChange={e => props.setAge(e.target.value)}
          />
          <input className="input__button" type="reset" value="Reset" />
        </form>
      ) : null}
    </div>
  );
};

export default Filter;

import React, { Component } from "react";

class SearchBar extends Component {
  state = { location: "" };
  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(event, this.state.location);
  };
  handleChange = event => {
    this.setState({ location: event.target.value });
  };
  render() {
    return (
      <div className="search__search-bar">
        <h2 className="title">Find a pet</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Location..."
            value={this.state.location}
            onChange={this.handleChange}
            required
          />
          <input className="input__button" type="submit" value="submit" />
        </form>
        <p className="small-text">
          Try bigger cities like "Warsaw" or "Poznań". Due to the lack of
          support for 3rd party APIs, only literal values will be found.
        </p>
      </div>
    );
  }
}

export default SearchBar;

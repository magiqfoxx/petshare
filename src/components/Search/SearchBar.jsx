import React, { Component } from "react";

class SearchBar extends Component {
  state = { location: "" };
  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state.location);
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
      </div>
    );
  }
}

export default SearchBar;

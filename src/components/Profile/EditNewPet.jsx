import React, { Component } from "react";
import { UserContext } from "../../App";

import FormError from "../Landing/FormError";
import { addNewPet } from "../utilities/utilities.js";

import quitImg from "../../img/icons/cancel.svg";
import pictureImg from "../../img/icons/gallery.svg";
import checkImg from "../../img/icons/correct.svg";

class EditNewPet extends Component {
  state = {
    name: "",
    species: "",
    age: "",
    description: "",
    image: "",
    imageTooLarge: false,
    imageAdded: false
  };

  handleSubmit = async (event, user) => {
    event.preventDefault();
    //nothing should be added if an error is thrown
    try {
      //validate that an image was selected
      if (this.state.image) {
        const newPet = {
          owner: { id: user.uid, name: user.name },
          location: user.location ? user.location : null,
          name: this.state.name,
          species: this.state.species,
          age: this.state.age,
          description: this.state.description
        };

        await addNewPet(user.uid, newPet, this.state.image);

        this.props.close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  setImage = event => {
    if (event.target.files) {
      if (event.target.files[0].size > 2000000) {
        this.setState({ imageTooLarge: true });
      } else {
        this.setState({ image: event.target.files[0] });
        this.setState({ imageAdded: true });
      }
    }
  };
  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <div className="background" onClick={() => this.props.close()}>
            <div className="edit__form">
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, context)}
                onClick={event => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="quit"
                  onClick={() => this.props.close()}
                >
                  <img src={quitImg} alt="quit" />
                </button>
                <h1 className="form__title">Add a new pet</h1>
                <label htmlFor="name">Name:</label>
                <input
                  className="form__text-input"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  maxLength={12}
                  required
                />
                <label htmlFor="species">Species:</label>
                <input
                  className="form__text-input filter__input"
                  list="speciess"
                  id="species"
                  name="species"
                  onChange={this.handleChange}
                  value={this.state.species}
                  maxLength={20}
                  required
                />
                <datalist id="speciess">
                  <option value="dog" />
                  <option value="cat" />
                  <option value="reptile" />
                  <option value="rodent" />>
                  <option value="bird" />
                </datalist>
                <label htmlFor="age">Age:</label>
                <input
                  className="form__text-input"
                  type="string"
                  name="age"
                  id="age"
                  onChange={this.handleChange}
                  value={this.state.age}
                  required
                  maxLength={10}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                  className="form__textarea"
                  name="description"
                  id="description"
                  cols="30"
                  rows="10"
                  maxLength="255"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
                <label
                  className="form__file--label label"
                  htmlFor="picture"
                  role="button"
                >
                  {this.state.imageAdded ? (
                    <img
                      className="icon"
                      src={checkImg}
                      alt="check"
                      title="image added"
                    />
                  ) : (
                    <img
                      className="icon"
                      src={pictureImg}
                      alt="picture"
                      title="add image"
                    />
                  )}
                </label>
                <input
                  className="form__file"
                  type="file"
                  name="picture"
                  id="picture"
                  accept="image/png, image/jpeg"
                  onChange={this.setImage}
                  required
                />
                {this.state.imageTooLarge ? (
                  <FormError message="Image is too large" />
                ) : null}
                <p className="form__text">Please, choose a jpg or png file.</p>
                <button className="button" type="submit" value="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default EditNewPet;

import React, { Component } from "react";
import { UserContext } from "../../App";

import FormError from "../Landing/FormError";
import {
  uploadPetImg,
  addNewPet,
  addToPetCollection
} from "../utilities/utilities.js";
import quitImg from "../../img/icons/cancel.svg";
import pictureImg from "../../img/icons/gallery.svg";

class EditNewPet extends Component {
  state = {
    name: "",
    species: "",
    age: "",
    description: "",
    image: "",
    imageTooLarge: false
  };

  handleSubmit = async (event, user) => {
    event.preventDefault();
    if (this.state.image) {
      const newPet = {
        name: this.state.name,
        species: this.state.species,
        age: this.state.age,
        description: this.state.description
      };

      const petRef = await addNewPet(user, newPet);
      const petCollectionRef = await addToPetCollection(newPet);
      await uploadPetImg(
        petRef.id,
        this.state.image,
        user.uid,
        petCollectionRef.id
      );

      this.props.close();
    }

    //.update to change edit the doc
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
                className="form form--editPet"
                onSubmit={event => this.handleSubmit(event, context)}
                onClick={event => event.stopPropagation()}
              >
                <button className="quit" onClick={() => this.props.close()}>
                  <img src={quitImg} alt="quit" />
                </button>
                <h1 className="form__title">Edit your pet</h1>
                <img
                  className="form__img"
                  src={this.props.pet.img}
                  alt="your pet"
                />
                <input className="form__input" type="image" src="" alt="" />
                <label className="form__label" htmlFor="name">
                  Name:
                </label>
                <input
                  className="form__input form__text-input"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  required
                />
                <label className="form__label" htmlFor="species">
                  Species:
                </label>
                <input
                  className="form__input form__text-input"
                  type="text"
                  name="species"
                  id="species"
                  onChange={this.handleChange}
                  value={this.state.species}
                  required
                />
                <label className="form__label" htmlFor="age">
                  Age:
                </label>
                <input
                  className="form__input form__text-input"
                  type="number"
                  name="age"
                  id="age"
                  onChange={this.handleChange}
                  value={this.state.age}
                  required
                />
                <label className="form__label" htmlFor="description">
                  Description:
                </label>
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
                <img
                  className="form__img"
                  src={pictureImg}
                  alt="picture icon"
                />
                <input
                  className="form__file"
                  type="file"
                  name="image"
                  id="image"
                  accept="image/png, image/jpeg"
                  onChange={this.setImage}
                  required
                />
                {this.state.imageTooLarge ? (
                  <FormError message="Image is too large" />
                ) : null}
                <p className="form__text">Please, choose a jpg or png file.</p>
                <input className="input__button" type="submit" value="submit" />
              </form>
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default EditNewPet;

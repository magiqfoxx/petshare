import React, { Component } from "react";
import { UserContext } from "../../App";

import Modal from "../Modals/Modal";
import FormError from "../Landing/FormError";
import { dataChanged, updatePetData } from "../utilities/utilities";
import { uploadPetImg } from "../utilities/addToStorage";
import quitImg from "../../img/icons/cancel.svg";
import editImg from "../../img/icons/edit.svg";

class EditNewPet extends Component {
  state = {
    name: this.props.pet.name,
    species: this.props.pet.species,
    age: this.props.pet.age,
    description: this.props.pet.description,
    image: this.props.pet.img,
    imageTooLarge: false,
    showAddImg: false,
    imageChanged: false
  };

  handleSubmit = async (event, user) => {
    event.preventDefault();
    try {
      const newPet = {
        name: this.state.name,
        species: this.state.species,
        age: this.state.age,
        description: this.state.description
      };
      const pet = this.props.pet;
      const wasDataChanged = dataChanged(this.props, newPet);

      //check if any changes were made
      if (wasDataChanged) {
        updatePetData(user.uid, this.props.pet.uid, newPet);
      }
      if (this.state.imageChanged) {
        uploadPetImg(user.uid, pet.uid, this.state.image);
      }
    } catch (error) {
      console.log(error);
    }
    this.props.close();
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  setImage = event => {
    if (event.target.files) {
      //don't accept imgs > 2mb
      if (event.target.files[0].size > 2000000) {
        this.setState({ imageTooLarge: true });
      } else {
        this.setState({ image: event.target.files[0], imageChanged: true });
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
                <button
                  type="button"
                  className="quit"
                  onClick={() => this.props.close()}
                >
                  <img src={quitImg} alt="quit" />
                </button>
                <h1 className="form__title">Edit your pet</h1>
                <div className="form__container">
                  <img
                    className="form__picture"
                    src={this.props.pet.img}
                    alt="your pet"
                  />
                  <button
                    type="button"
                    className="edit"
                    onClick={() => this.setState({ showAddImg: true })}
                  >
                    <img src={editImg} alt="edit" />
                  </button>
                </div>
                {this.state.showAddImg && (
                  <Modal
                    component={
                      <div
                        className="background"
                        onClick={() => this.setState({ showAddImg: false })}
                      >
                        <div
                          className="modal modal--form"
                          onClick={event => event.stopPropagation()}
                        >
                          <input
                            className="form__file"
                            type="file"
                            name="image"
                            id="image"
                            accept="image/png, image/jpeg"
                            onChange={this.setImage}
                          />
                          <p className="form__text">
                            Please, choose a jpg or png file.
                          </p>
                          <button
                            className="submit-button"
                            onClick={() => this.setState({ showAddImg: false })}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    }
                  />
                )}

                <label className="form__label form__label--name" htmlFor="name">
                  Name:
                </label>
                <input
                  className="form__input--name form__text-input"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  maxLength={12}
                />
                <label
                  className="form__label form__label--species"
                  htmlFor="species"
                >
                  Species:
                </label>
                <input
                  className="form__input form__input--species form__text-input"
                  type="text"
                  name="species"
                  id="species"
                  onChange={this.handleChange}
                  value={this.state.species}
                  maxLength={20}
                />
                <label className="form__label form__label--age" htmlFor="age">
                  Age:
                </label>
                <input
                  className="form__input form__input--age form__text-input"
                  type="text"
                  name="age"
                  id="age"
                  onChange={this.handleChange}
                  value={this.state.age}
                  maxLength={10}
                />
                <label
                  className="form__label form__label--description"
                  htmlFor="description"
                >
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

                {this.state.imageTooLarge ? (
                  <FormError message="Image is too large" />
                ) : null}

                <input
                  className="form__submit input__button"
                  type="submit"
                  value="submit"
                />
              </form>
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default EditNewPet;

import React, { Component } from "react";
import { UserContext } from "../../App";
import { firestore, storage } from "../firebase";

import quitImg from "../../img/icons/cancel.svg";
import pictureImg from "../../img/icons/gallery.svg";

class EditNewPet extends Component {
  state = { name: "", species: "", age: "", description: "", image: "" };

  handleSubmit = async (event, user) => {
    event.preventDefault();

    const fileType = this.state.image.name.split(".").pop();
    const storageRef = storage.ref(`images/user/pets/${user.uid}.${fileType}`);
    //adds the picture at the specified reference/place
    await storageRef.put(this.state.image);
    const pictureImg = await storageRef.getDownloadURL();

    const newPet = {
      name: this.state.name,
      species: this.state.species,
      age: this.state.age,
      description: this.state.description,
      img: pictureImg
    };

    const userRef = firestore.collection("users").doc(user.uid);
    const addedPet = await userRef.collection("pets").add(newPet);

    this.props.close();
    //.update to change edit the doc
  };

  handleChange = event => {
    //this as a HOOK?
    console.log(event.target.files);
    if (event.target.files) {
      console.log("files");
      this.setState({ image: event.target.files[0] });
    } else {
      this.setState({ [event.target.id]: event.target.value });
    }
    console.log(this.state);
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
                <button className="quit" onClick={() => this.props.close()}>
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
                  required
                />
                <label htmlFor="species">Species:</label>
                <input
                  className="form__text-input"
                  type="text"
                  name="species"
                  id="species"
                  onChange={this.handleChange}
                  value={this.state.species}
                  required
                />
                <label htmlFor="age">Age:</label>
                <input
                  className="form__text-input"
                  type="number"
                  name="age"
                  id="age"
                  onChange={this.handleChange}
                  value={this.state.age}
                  required
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
                <img className="form__img" src={pictureImg} alt="picture" />
                <input
                  className="form__file"
                  type="file"
                  name="image"
                  id="image"
                  accept="image/png, image/jpeg"
                  onChange={this.handleChange}
                  value={this.state.image}
                  required
                />
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

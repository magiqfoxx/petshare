import React, { useState, useContext } from "react";
import { UserContext } from "../../App";

import { updateUser } from "../utilities/utilities";
import { updatePetInDataBase } from "../utilities/updateDatabase";
import { getLocation } from "../utilities/geoLocation";
import { geohashEncode } from "../utilities/geoHash";
import quitImg from "../../img/icons/cancel.svg";
import geoLocationImg from "../../img/icons/target.svg";
import { firestore } from "../firebase";

const EditLocation = props => {
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState("");
  const [geohash, setGeohash] = useState("");
  const user = useContext(UserContext);

  const getGeoLocation = async () => {
    const location = await getLocation();
    const geohash = geohashEncode(
      location.coords.latitude,
      location.coords.longitude,
      5
    );
    const newCoords = {
      lat: location.coords.latitude,
      lon: location.coords.longitude
    };
    setCoords(newCoords);
    setGeohash(geohash);
  };
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      updateUser(user.uid, { location, coords, geohash });

      firestore
        .collection("users")
        .doc(user.uid)
        .collection("pets")
        .get()
        .then(snapshot => {
          snapshot.forEach(pet => {
            updatePetInDataBase(user.uid, pet.id, {
              location,
              coords,
              geohash
            });
          });
        });
    } catch (error) {
      console.log(error);
    }
    props.close();
  };
  const handleChange = async event => {
    setLocation(event.target.value);
  };
  return (
    <div className="background" onClick={() => props.close()}>
      <div className="edit__form">
        <form
          className="form"
          onSubmit={handleSubmit}
          onClick={event => event.stopPropagation()}
        >
          <button type="button" className="quit" onClick={() => props.close()}>
            <img src={quitImg} alt="quit" />
          </button>
          <h1 className="form__title">Add a location</h1>
          <label htmlFor="location">Location:</label>
          <div className="geoLocation">
            <button
              type="button"
              className="geoLocation__button"
              onClick={getGeoLocation}
            >
              <img src={geoLocationImg} alt="geolocation" />
            </button>
            <input
              className="form__text-input"
              type="text"
              name="location"
              id="location"
              onChange={handleChange}
              value={location}
            />
          </div>

          <input className="input__button" type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};

export default EditLocation;

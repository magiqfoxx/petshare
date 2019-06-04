import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { firestore } from "../firebase.js";

import UserSlate from "./UserSlate";

const Followed = () => {
  const [followed, setFollowed] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    console.log(user);

    setFollowed(user.followed);
    /*
    const query = firestore
      .collection("users").doc(user.uid)
      .doc("favorites")
      .get()
      .then(results => {
        if (results.length > 0) {
          setFavorites(results.data());
        } else {
          setFavorites("Sorry. No pets matched your query");
        }
      });*/
  }, []);

  const renderFollowed = () => {
    if (followed) {
      return followed.map(pet => {
        return <UserSlate name={pet.name} image={pet.img} />;
      });
    }
  };
  return <div className="favorites">{renderFollowed()}</div>;
};

export default Followed;

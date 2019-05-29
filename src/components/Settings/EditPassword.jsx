import React, { useState } from "react";
import firebase from "../firebase";

import FormError from "../Landing/FormError";
import quitImg from "../../img/icons/cancel.svg";

const EditPassword = props => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  //const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    if (password === password2) {
      const currentUser = firebase.auth().currentUser;

      currentUser
        .updatePassword(password)
        .then(function() {
          // Update successful.
          //alert("You've successfully updated your password");
          setShowConfirmation(true);
          //props.close();
        })
        .catch(function(error) {
          console.log(error);
          alert(error.message);
        });
    }
  };

  return (
    <div className="background" onClick={() => props.close()}>
      <div className="edit__form">
        <form
          className="form"
          onSubmit={handleSubmit}
          onClick={event => event.stopPropagation()}
        >
          <button className="quit" onClick={() => props.close()}>
            <img src={quitImg} alt="quit" />
          </button>
          <h1 className="form__title">New Password</h1>
          {showConfirmation ? (
            <React.Fragment>
              <h1 className="form__text">
                "You've successfully changed your password!"
              </h1>
              <button className="input__button" onClick={() => props.close()}>
                OK
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <label htmlFor="password">New password:</label>
              <input
                value={password}
                id="password"
                onChange={e => setPassword(e.target.value)}
                type="password"
                minLength="6"
                placeholder="********"
              />
              <label htmlFor="password2">Confirm new password:</label>
              <input
                value={password2}
                id="password2"
                onChange={e => setPassword2(e.target.value)}
                type="password"
                minLength="6"
                placeholder="********"
              />
              {password !== password2 ? (
                <FormError message="Passwords don't match" />
              ) : null}
              <input className="input__button" type="submit" value="submit" />
            </React.Fragment>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditPassword;

/*
      {showConfirmation ? (
        <Modal
          component={
            <OKPopup
              message="You've successfully changed your password!"
              close={() => setShowConfirmation(false)}
            />
          }
        />
      ) : null}
      */

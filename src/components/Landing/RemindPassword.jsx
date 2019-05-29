import React, { useState } from "react";
import firebase from "../firebase";

import quitImg from "../../img/icons/cancel.svg";

const RemindPassword = props => {
  const [email, setEmail] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    const auth = firebase.auth();

    auth
      .sendPasswordResetEmail(email)
      .then(function() {
        // Email sent.
        setShowConfirmation(true);
      })
      .catch(function(error) {
        // An error happened.
        console.log(error);
      });
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
          {showConfirmation ? (
            <React.Fragment>
              <h1 className="form__label">
                "An email will be sent with your new password"
              </h1>
              <button className="input__button" onClick={() => props.close()}>
                OK
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h1 className="form__title">Add your email</h1>
              <label className="form__label" htmlFor="email">
                Email:
              </label>
              <input
                className="form__text-input"
                type="email"
                name="email"
                id="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                required
              />
              <input className="input__button" type="submit" value="submit" />
            </React.Fragment>
          )}
        </form>
      </div>
    </div>
  );
};

export default RemindPassword;

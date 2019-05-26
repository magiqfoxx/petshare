import React from "react";

import errorImg from "../../img/icons/prohibition.svg";

const PasswordsNotMatching = () => {
  return (
    <div className="form__error">
      <img className="form__error__img" src={errorImg} alt="error" />
      <div className="form__error__arrow">
        <div className="form__error__arrow form__error__arrow--small" />
      </div>
      <span className="form__error__text">Passwords don't match</span>
    </div>
  );
};

export default PasswordsNotMatching;

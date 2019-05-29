import React from "react";

import quitImg from "../../img/icons/cancel.svg";

const Popup = props => {
  return (
    <div className="background" onClick={() => props.close()}>
      <div className="form edit__form modal">
        <button className="quit" onClick={() => props.close()}>
          <img src={quitImg} alt="quit" />
        </button>
        <h1 className="form__title modal__title">{props.message}</h1>
        <p className="modal__text">This action cannot be undone</p>
        <button
          className="input__button modal__button cancel"
          onClick={() => props.close()}
        >
          Cancel
        </button>
        <button
          className="input__button modal__button yes"
          onClick={() => props.proceed()}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Popup;

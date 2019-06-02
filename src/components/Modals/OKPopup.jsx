import React from "react";

import quitImg from "../../img/icons/cancel.svg";

const Popup = props => {
  return (
    <div className="background" onClick={() => props.close()}>
      <div className="form edit__form modal">
        <button type="button" className="quit" onClick={() => props.close()}>
          <img src={quitImg} alt="quit" />
        </button>
        <h1 className="form__title modal__title">{props.message}</h1>
        <button
          type="button"
          className="input__button modal__button yes"
          onClick={() => props.close()}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;

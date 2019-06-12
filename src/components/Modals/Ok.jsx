import React from "react";

import quitImg from "../../img/icons/cancel.svg";

const Ok = props => {
  return (
    <React.Fragment>
      <h1 className="modal__title">{props.message}</h1>

      <button
        type="button"
        className="modal__button"
        onClick={() => props.close()}
      >
        OK
      </button>
    </React.Fragment>
  );
};

export default Ok;

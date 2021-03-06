import React from "react";
import ReactDOM from "react-dom";

import quitImg from "../../img/icons/cancel.svg";

const ConfirmationModal = props => {
  return ReactDOM.createPortal(
    <div className="background" onClick={() => props.close()}>
      <div className="modal-slate" onClick={e => e.stopPropagation()}>
        <button type="button" className="quit" onClick={() => props.close()}>
          <img className="icon" src={quitImg} alt="quit" />
        </button>
        {props.component}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ConfirmationModal;

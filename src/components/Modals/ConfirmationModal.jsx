import React from "react";
import ReactDOM from "react-dom";

import ConfirmationPopup from "./ConfirmationPopup";

const ConfirmationModal = props => {
  return ReactDOM.createPortal(
    <ConfirmationPopup
      message={props.message}
      close={() => props.close()}
      proceed={() => props.proceed()}
    />,
    document.getElementById("modal-root")
  );
};

export default ConfirmationModal;

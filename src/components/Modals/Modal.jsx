import React from "react";
import ReactDOM from "react-dom";

const ConfirmationModal = props => {
  return ReactDOM.createPortal(
    props.component,
    document.getElementById("modal-root")
  );
};

export default ConfirmationModal;

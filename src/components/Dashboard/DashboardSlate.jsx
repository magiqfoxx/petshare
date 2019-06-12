import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from "../Modals/Modal";

import viewImg from "../../img/icons/visible.svg";
const DashboardSlate = props => {
  const [enlargeImg, setEnlargeImg] = useState(false);

  return (
    <div className="user-slate">
      <Link to={`./user/${props.id}`}>
        <img
          className="user-slate__image"
          src={props.image}
          alt={props.name}
          onClick={e => e.stopPropagation()}
        />
      </Link>
      <button className="view" onClick={() => setEnlargeImg(true)}>
        <img className="icon view__img" src={viewImg} alt="view" />
      </button>
      {enlargeImg && (
        <Modal
          component={
            <div className="background" onClick={() => setEnlargeImg(false)}>
              <img className="modal__image" src={props.image} />
            </div>
          }
        />
      )}
    </div>
  );
};

export default DashboardSlate;

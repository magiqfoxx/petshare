import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from "../Modals/Modal";

const DashboardSlate = props => {
  const [enlargeImg, setEnlargeImg] = useState(false);

  return (
    <div className="user-slate">
      <img
        className="user-slate__image"
        src={props.image}
        alt={props.name}
        onClick={() => setEnlargeImg(true)}
      />
      <div className="user-slate__bolded">
        <h3 className="user-slate___name">
          <Link to={`./user/${props.id}`}>{props.name}</Link>
        </h3>
        <span className="user-slate___location">{props.location}</span>
      </div>
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

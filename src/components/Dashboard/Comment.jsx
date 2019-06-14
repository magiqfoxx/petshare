import React, { useContext, useState } from "react";
import { formatTimestamp } from "../utilities/utilities.js";
import { UserContext } from "../../App";
import { removeComment } from "../utilities/utilities.js";

import ConfirmationPopUp from "../Modals/ConfirmationPopup";
import Modal from "../Modals/Modal";
import deleteImg from "../../img/icons/garbage.svg";

const Comment = props => {
  const user = useContext(UserContext);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const deleteComment = () => {
    removeComment(props.postAuthorID, props.postID, props.id);
  };
  return (
    <div className="comment-slate">
      {user.uid === props.author.id ? (
        <button className="delete" onClick={() => setShowDeleteMessage(true)}>
          <img className="delete__img" src={deleteImg} alt="delete" />
        </button>
      ) : null}
      <p className="comment__text">{props.comment}</p>

      <span className="comment__author"> - {props.author.name}</span>
      <span className="comment__date">({formatTimestamp(props.date)})</span>
      {showDeleteMessage && (
        <Modal
          component={
            <ConfirmationPopUp
              close={() => setShowDeleteMessage(false)}
              proceed={deleteComment}
            />
          }
        />
      )}
    </div>
  );
};

export default Comment;

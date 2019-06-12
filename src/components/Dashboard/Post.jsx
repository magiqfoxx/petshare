import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { UserContext } from "../../App";

import Comment from "./Comment";
import Modal from "../Modals/Modal";
import ConfirmationPopUp from "../Modals/ConfirmationPopup";

import { formatTimestamp, removePost } from "../utilities/utilities";
import deleteImg from "../../img/icons/garbage.svg";

const Post = props => {
  const user = useContext(UserContext);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [enlargeImg, setEnlargeImg] = useState(false);

  const deletePost = () => {
    removePost(user.uid, props.id);
  };
  const renderComments = () => {
    if (props.comments) {
      props.comments.map(comment => {
        return (
          <Comment
            author={comment.author}
            text={comment.author}
            date={comment.date}
          />
        );
      });
    }
  };

  return (
    <React.Fragment>
      <div className="post post-slate">
        {props.editable ? (
          <button className="delete" onClick={() => setShowDeleteMessage(true)}>
            <img className="delete__img" src={deleteImg} alt="delete" />
          </button>
        ) : null}
        <h2 className="post__title">{props.title}</h2>
        <p className="post__date">{formatTimestamp(props.date)}</p>
        {props.img ? (
          <img className="post__image" src={props.img} alt={props.title} />
        ) : null}
        <p className="post__text">{props.text}</p>
        <p className="post__author">
          <Link to={`/user/${props.author.id}`}>- {props.author.name}</Link>
        </p>
      </div>
      <div className="comments">{renderComments()}</div>
      {enlargeImg && (
        <Modal
          component={
            <div className="background" onClick={() => setEnlargeImg(false)}>
              <img className="modal__image" src={props.img} />
            </div>
          }
        />
      )}
      {showDeleteMessage && (
        <Modal
          component={
            <ConfirmationPopUp
              message="Are you sure you want to delete that post?"
              close={() => setShowDeleteMessage(false)}
              proceed={deletePost}
            />
          }
        />
      )}
    </React.Fragment>
  );
};

export default Post;

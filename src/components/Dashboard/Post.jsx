import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { UserContext } from "../../App";
import { firestore } from "../firebase";

import Comments from "./Comments";
import Modal from "../Modals/Modal";
import ConfirmationPopUp from "../Modals/ConfirmationPopup";

import { formatTimestamp, removePost } from "../utilities/utilities";
import deleteImg from "../../img/icons/garbage.svg";

const Post = props => {
  const [comments, setComments] = useState(props.lastComments);
  const [moreComments, setMoreComments] = useState(true);
  const [dateOfOldestComment, setDateOfOldestComment] = useState(
    props.dateOfOldestComment
  );
  const user = useContext(UserContext);

  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [enlargeImg, setEnlargeImg] = useState(false);

  const loadMoreComments = () => {
    firestore
      .collection("users")
      .doc(props.author.id)
      .collection("posts")
      .doc(props.id)
      .collection("comments")
      .orderBy("date", "desc")
      .startAfter(dateOfOldestComment)
      .limit(3)
      .get()
      .then(results => {
        let newComments = [];
        results.forEach(result => {
          newComments.push(result.data());
        });
        if (newComments.length > 0) {
          setComments([...comments, ...newComments]);
          setDateOfOldestComment(newComments[newComments.length - 1].date);
          if (newComments.length < 3) {
            setMoreComments(false);
          }
        } else {
          setMoreComments(false);
        }
      });
  };

  const deletePost = () => {
    removePost(user.uid, props.id);
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
        <div className="comments">
          <Comments
            postID={props.id}
            authorID={props.author.id}
            comments={comments}
            lastComments={props.lastComments}
            loadMoreComments={loadMoreComments}
            moreComments={
              props.lastComments && props.lastComments.length < 2
                ? false
                : moreComments
            }
          />
        </div>
      </div>

      {enlargeImg && (
        <Modal
          component={
            <div className="background" onClick={() => setEnlargeImg(false)}>
              <img className="modal__image" src={props.img} alt={props.title} />
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

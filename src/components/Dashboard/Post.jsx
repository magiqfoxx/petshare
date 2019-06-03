import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Comment from "./Comment";

import { formatTimestamp } from "../utilities/utilities";

const Post = props => {
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
        <h2 className="post__title">{props.title}</h2>
        <span className="post__date">{formatTimestamp(props.date)}</span>
        <img className="post__image" src={props.img} alt={props.title} />
        <p className="post__text">{props.text}</p>
        <p className="post__author">
          <Link to={`/user/${props.author.id}`}>- {props.author.name}</Link>
        </p>
      </div>
      <div className="comments">{renderComments()}</div>
    </React.Fragment>
  );
};

export default Post;

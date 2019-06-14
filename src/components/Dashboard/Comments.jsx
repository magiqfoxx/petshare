import React, { useContext, useState, useEffect } from "react";
import Comment from "./Comment";
import { UserContext } from "../../App";

import { getDate } from "../utilities/utilities.js";
import { addNewComment } from "../utilities/utilities";

const Comments = props => {
  const user = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(props.lastComments);
  }, [props.lastComments]);

  const renderComments = () => {
    if (comments) {
      return comments.map(comment => {
        return (
          <Comment
            comment={comment.comment}
            author={comment.author}
            date={comment.date}
            key={comment.id}
            id={comment.id}
            postAuthorID={props.authorID}
            postID={props.postID}
          />
        );
      });
    } else {
      return <p className="small-text">Be the first to comment</p>;
    }
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (comment) {
      const newComment = {
        author: {
          id: user.uid,
          name: user.name
        },
        date: getDate(),
        comment: comment
      };
      addNewComment(props.authorID, props.postID, newComment);
      setComment("");
    }
  };

  return (
    <React.Fragment>
      <form className="comment__form" onSubmit={handleSubmit}>
        <input
          className="comments__input"
          type="text"
          name="comment"
          id="comment"
          placeholder="write a comment..."
          value={comment}
          onChange={e => {
            setComment(e.target.value);
          }}
        />
        <input className="comments__button" type="submit" value="Submit" />
      </form>
      <div className="comment-list">{renderComments()}</div>
    </React.Fragment>
  );
};

export default Comments;

import React from "react";

const Comment = props => {
  return (
    <div className="comment">
      <p>{props.text}</p>
      <span>{props.author}</span>
      <span>{props.date}</span>
    </div>
  );
};

export default Comment;

import React, { useState, useContext } from "react";

import { UserContext } from "../../App";

import FormError from "../Landing/FormError";
import { addNewPost } from "../utilities/addToDatabase.js";
import { uploadPostImg } from "../utilities/addToStorage";
import { getDate } from "../utilities/utilities.js";

import pictureImg from "../../img/icons/gallery.svg";

const NewPost = props => {
  const user = useContext(UserContext);

  const [postTitle, setPostTitle] = useState("");
  const [post, setPost] = useState("");
  const [picture, setPicture] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();
    if ((typeof picture == "object") & (picture.name.length > 0)) {
      const date = getDate();
      try {
        const newPost = {
          title: postTitle,
          post,
          date,
          author: { name: user.name, id: user.uid }
        };
        const postID = await addNewPost(user.uid, newPost);
        console.log(postID);
        uploadPostImg(user.uid, postID, picture);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const setImage = event => {
    if (event.target.files) {
      if (event.target.files[0].size > 2000000) {
        setPicture("too large");
      } else {
        setPicture(event.target.files[0]);
      }
    }
  };

  return (
    <div className="dashboard small-slate">
      <form
        className="new-post"
        onSubmit={handleSubmit}
        onClick={event => event.stopPropagation()}
      >
        <input
          className="new-post__title input"
          type="text"
          name="postTitle"
          id="postTitle"
          value={postTitle}
          onChange={e => setPostTitle(e.target.value)}
          placeholder="Title"
          maxLength="30"
          required
        />
        <textarea
          className="new-post__text input"
          name="post"
          id="post"
          onChange={e => setPost(e.target.value)}
          value={post}
          maxLength="255"
          rows="3"
          placeholder="New post..."
          required
        />
        <label
          className="new-post__picture--label label"
          htmlFor="picture"
          role="button"
        >
          <img className="new-post__picture" src={pictureImg} alt="picture" />
        </label>
        <input
          className="new-post__picture-input"
          type="file"
          name="picture"
          id="picture"
          onChange={setImage}
          accept="image/png, image/jpeg"
        />
        {picture == "too large" ? (
          <FormError message="Image is too large" />
        ) : null}
        <input className="input__button" type="submit" value="submit" />
      </form>
    </div>
  );
};

export default NewPost;

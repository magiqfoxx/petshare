import React, { useState, useContext } from "react";

import { UserContext } from "../../App";

import FormError from "../Landing/FormError";
import { uploadPostImg } from "../utilities/addToStorage";
import { getDate, addNewPost } from "../utilities/utilities.js";

import pictureImg from "../../img/icons/gallery.svg";
import checkImg from "../../img/icons/correct.svg";

const NewPost = props => {
  const user = useContext(UserContext);

  const [postTitle, setPostTitle] = useState("");
  const [post, setPost] = useState("");
  const [imageAdded, setImageAdded] = useState(false);
  const [picture, setPicture] = useState({});
  const handleSubmit = async event => {
    event.preventDefault();

    const date = getDate();
    try {
      const newPost = {
        title: postTitle,
        post,
        date,
        author: { name: user.name, id: user.uid },
        followedBy: user.followedBy ? user.followedBy : []
      };
      const postID = await addNewPost(user.uid, newPost);

      if (picture instanceof File) {
        uploadPostImg(user.uid, postID, picture);
      }
    } catch (error) {
      console.log(error);
    }
    setPostTitle("");
    setPost("");
    setPicture({});
    props.close();
  };
  const setImage = event => {
    if (event.target.files) {
      if (event.target.files[0].size > 2000000) {
        setPicture("too large");
      } else {
        setPicture(event.target.files[0]);
        setImageAdded(true);
      }
    }
  };

  return (
    <React.Fragment>
      <h2 className="modal-slate__title">Add new post</h2>
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
          {imageAdded ? (
            <img
              className="icon"
              src={checkImg}
              alt="check"
              title="image added"
            />
          ) : (
            <img
              className="new-post__picture"
              src={pictureImg}
              alt="picture"
              title="add image"
            />
          )}
        </label>
        <input
          className="new-post__picture-input"
          type="file"
          name="picture"
          id="picture"
          onChange={setImage}
          accept="image/png, image/jpeg"
        />
        <p className="new-post__picture-text">
          Please, choose a jpg or png file.
        </p>
        {picture == "too large" ? (
          <FormError message="Image is too large" />
        ) : null}
        <input className="button" type="submit" value="submit" />
      </form>
    </React.Fragment>
  );
};

export default NewPost;

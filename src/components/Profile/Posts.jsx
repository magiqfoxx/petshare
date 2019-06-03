import React, { useEffect, useState } from "react";

import { firestore } from "../firebase.js";

import Post from "../Dashboard/Post";

const Posts = props => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (props.user.uid) {
      let allPosts = [];
      const postsRef = firestore
        .collection("users")
        .doc(props.user.uid)
        .collection("posts");
      const postQuery = postsRef.orderBy("date").limit(3);
      postQuery
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            allPosts.push(doc.data());
          });
          setPosts(allPosts);
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    }
  }, props.user.uid);

  const renderPosts = () => {
    if (posts) {
      return posts.map(post => {
        return (
          <Post
            title={post.title}
            author={post.author}
            img={post.img}
            text={post.post}
            date={post.date}
            comments={post.comments}
            key={post.id}
          />
        );
      });
    } else {
      return <h2>Loading...</h2>;
    }
  };

  return <div className="posts">{renderPosts()}</div>;
};

export default Posts;

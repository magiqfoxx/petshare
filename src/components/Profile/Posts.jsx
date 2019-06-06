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
      const postQuery = postsRef.orderBy("date", "desc").limit(3);
      postQuery.onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          allPosts.push(doc.data());
        });
        setPosts(allPosts);
      });
    }
  }, []);

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
            id={post.id}
            editable={true}
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

import React, { useEffect, useState } from "react";
import Post from "../Post";

import { firestore } from "../../firebase";

const FollowedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const query = firestore
      .collectionGroup("posts")
      .orderBy("date", "desc")
      .limit(3);
    let results = [];
    query.get().then(function(querySnapshot) {
      querySnapshot.forEach(doc => {
        results.push(doc.data());
      });
      if (results.length > 0) {
        setPosts(results);
      } else {
        setPosts(false);
      }
    });
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
            //react is saying the id isn't unique?
            key={post.id}
            id={post.id}
            editable={false}
          />
        );
      });
    } else {
      return (
        <div className="post post-slate">
          <h3>You need to follow more people!</h3>
        </div>
      );
    }
  };
  return <div className="following">{renderPosts()}</div>;
};

export default FollowedPosts;

import React, { useEffect, useState } from "react";
import Post from "./Post";

import { firestore } from "../firebase";

const FollowedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const query = firestore
      .collectionGroup("posts")
      .orderBy("date")
      .limit(3);
    let results = [];
    query.get().then(function(querySnapshot) {
      querySnapshot.forEach(doc => {
        results.push(doc.data());
      });
      if (results.length > 0) {
        setPosts(results);
      } else {
        setPosts("Sorry. No pets matched your query");
      }
    });
  }, []);

  const renderPosts = () => {
    //based on the list of follows
    //get 1 post from each user?
    //OTHERWISE I NEED A SEPERATE DB OF ALL POSTS
    //AND THEN I CAN QUERY BY DATE & FOLLOWERS
    //and not by this user
    //AND LIMIT TO 3/5?
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
  };
  return <div className="following">{renderPosts()}</div>;
};

export default FollowedPosts;

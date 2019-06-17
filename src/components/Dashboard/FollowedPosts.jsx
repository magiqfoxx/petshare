import React, { useEffect, useState, useContext } from "react";
import Post from "./Post";
import { UserContext } from "../../App";

import { firestore } from "../firebase";

const FollowedPosts = () => {
  const [posts, setPosts] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    const query = firestore
      .collectionGroup("posts")
      .where("followedBy", "array-contains", user.uid)
      .orderBy("date", "desc")
      .limit(3);

    query.onSnapshot(snapshot => {
      let results = [];
      snapshot.forEach(doc => {
        results.push(doc.data());
      });
      if (results.length > 0) {
        setPosts(results);
      } else {
        setPosts(false);
      }
    });
  }, [user]);

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
            lastComments={post.lastComments}
            dateOfLastComment={post.dateOfLastComment}
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

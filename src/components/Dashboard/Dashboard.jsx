import React, { useState } from "react";

import FollowedPosts from "./FollowedPosts";
import NewPost from "./NewPost";
import Favorites from "./Favorites";
import Followed from "./Followed";
import BasicModal from "../Modals/BasicModal";

const Dashboard = () => {
  const [showNewPost, setShowNewPost] = useState(false);

  return (
    <div className="dashboard">
      <FollowedPosts />
      <button className="button" onClick={() => setShowNewPost(true)}>
        Add a new post
      </button>
      {showNewPost ? (
        <BasicModal
          component={<NewPost close={() => setShowNewPost(false)} />}
          close={() => setShowNewPost(false)}
        />
      ) : null}
      <Favorites />
      <Followed />
    </div>
  );
};

export default Dashboard;

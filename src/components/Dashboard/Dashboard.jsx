import React from "react";

import FollowedPosts from "./FollowedPosts";
import NewPost from "./NewPost";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <FollowedPosts />
      <NewPost />
    </div>
  );
};

export default Dashboard;

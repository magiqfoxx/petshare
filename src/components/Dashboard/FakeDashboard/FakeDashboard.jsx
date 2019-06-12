import React, { useState } from "react";

import FakeFollowedPosts from "./FakeFollowedPosts";
import Ok from "../../Modals/Ok";
import FakeFavorites from "./FakeFavorites";
import FakeFollowed from "./FakeFollowed";
import BasicModal from "../../Modals/BasicModal";

const FakeDashboard = () => {
  const [showNewPost, setShowNewPost] = useState(false);

  return (
    <div className="dashboard">
      <FakeFollowedPosts />
      <button className="button" onClick={() => setShowNewPost(true)}>
        Add a new post
      </button>
      {showNewPost ? (
        <BasicModal
          component={
            <Ok
              message="You have to sign up"
              close={() => setShowNewPost(false)}
            />
          }
          close={() => setShowNewPost(false)}
        />
      ) : null}
      <FakeFavorites />
      <FakeFollowed />
    </div>
  );
};

export default FakeDashboard;

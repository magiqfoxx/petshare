import React, { useState, useContext, useEffect } from "react";
import user from "./fakeData";

import DashboardSlate from "../DashboardSlate";

const Followed = () => {
  const [follows, setFollows] = useState([]);

  useEffect(() => {
    setFollows(user.follows);
  }, [user]);

  const renderFollowed = () => {
    if (follows) {
      return follows.map(user => {
        return (
          <DashboardSlate
            key={user.uid}
            name={user.name}
            location={user.location}
            image={user.img}
            id={user.uid}
          />
        );
      });
    }
  };
  return (
    <div className="follows small-slate">
      <h3>Following</h3>
      <div className="follows-list ">{renderFollowed()}</div>
    </div>
  );
};

export default Followed;

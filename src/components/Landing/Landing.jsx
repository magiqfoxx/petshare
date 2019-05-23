import React, { useState, useEffect } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Dashboard from "../Dashboard/Dashboard";

const Landing = () => {
  const [user, setUser] = useState(null);
  const [signIn, setSignIn] = useState(false);

  return (
    <main className="landing">
      {user ? (
        <Dashboard />
      ) : (
        <React.Fragment>
          <div className="landing__form">
            <SignUp signIn={() => setSignIn(true)} />
          </div>
          <div className="landing__image">
            <img src="../../img/iconfinder_cat_cage_182517.png" />
          </div>
          {signIn ? <SignIn /> : null}
        </React.Fragment>
      )}
    </main>
  );
};

export default Landing;

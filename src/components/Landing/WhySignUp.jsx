import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const WhySignUp = () => {
  return (
    <div className="landing__whySignUp">
      <h2 className="whySignUp__title">Signing up lets you:</h2>
      <ul className="whySignUp__list">
        <li className="whySignUp__list-item">Create profile page</li>
        <li className="whySignUp__list-item">Add pets to favorites</li>
        <p>
          The password is processed by google only Your email is only used for
          logging in and doesn't exist anywhere in the database. You can delete
          your account and all the data you provided will be removed
          immediately.
        </p>
      </ul>
      <p className="copyright">
        Cat by <a href="https://www.iconfinder.com/iconka">Denis Sazhin</a>{" "}
        licensed by{" "}
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
        >
          CC 3.0 BY
        </a>
      </p>
      <button className="button">
        <Link to="./search">Continue without logging in</Link>
      </button>
    </div>
  );
};

export default WhySignUp;

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const WhySignUp = props => {
  return (
    <div className="landing__whySignUp">
      <h2 className="whySignUp__title">Signing up lets you:</h2>
      <ul className="whySignUp__list">
        <li className="whySignUp__list-item">Create a profile page</li>
        <li className="whySignUp__list-item">Write posts and comments</li>
        <li className="whySignUp__list-item">Follow other pet lovers</li>
        <li className="whySignUp__list-item">Add pets to favorites</li>
        <p className="small-text">
          Authorisation is done through google. Your email is only used for
          logging in and doesn't exist anywhere in the database. You can delete
          your account and all the data related to your account will be removed
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
          rel="noopener noreferrer"
        >
          CC 3.0 BY
        </a>
      </p>
      <button className="button" onClick={props.logInAsAnonymous}>
        <Link to="/">See a sample</Link>
      </button>
    </div>
  );
};

export default WhySignUp;

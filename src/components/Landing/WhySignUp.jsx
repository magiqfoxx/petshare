import React from "react";

const WhySignUp = () => {
  return (
    <div className="landing__whySignUp">
      <h2 className="whySignUp__title">Signing up lets you:</h2>
      <ul className="whySignUp__list">
        <li className="whySignUp__list-item">Create profile page</li>
        <li className="whySignUp__list-item">Add pets to favorites</li>
      </ul>
      Cat by <a href="https://www.iconfinder.com/iconka">Denis Sazhin</a>{" "}
      licensed by{" "}
      <a
        href="http://creativecommons.org/licenses/by/3.0/"
        title="Creative Commons BY 3.0"
        target="_blank"
      >
        CC 3.0 BY
      </a>
    </div>
  );
};

export default WhySignUp;

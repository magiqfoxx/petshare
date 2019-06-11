import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  withRouter
} from "react-router-dom";
import { UserContext } from "../App";
import firebase from "./firebase";

import searchImg from "../img/icons/search.svg";
import profileImg from "../img/icons/profile.svg";
import settingsImg from "../img/icons/settings.svg";
import logoutImg from "../img/icons/logout.svg";
import loginImg from "../img/icons/iconfinder_login_4115234.svg";
import { setTimeout } from "timers";

const Navigation = props => {
  const context = useContext(UserContext);

  const logOut = async () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        setTimeout(() => {
          props.history.push("./");
        }, 2000);
      })
      .catch(function(error) {
        alert(error);
      });
  };

  const loggedIn = (
    <img
      className="nav__img"
      src={logoutImg}
      alt="logout"
      title="logout"
      onClick={() => {
        logOut();
      }}
    />
  );
  const loggedOut = (
    <NavLink to="/">
      <img className="nav__img" src={loginImg} alt="login" title="login" />
    </NavLink>
  );

  return (
    <nav className="nav">
      <div className="nav__logo" id="logo">
        <Link to="/">PetShare</Link>
      </div>
      <ul className="nav__ul">
        <li className="nav__ul__li">
          <Link to="/search">
            <img
              className="nav__img"
              src={searchImg}
              alt="search"
              title="search"
            />
          </Link>
        </li>
        {context ? (
          <React.Fragment>
            <li className="nav__ul__li">
              <Link to="/profile">
                <img
                  className="nav__img"
                  src={profileImg}
                  alt="profile"
                  title="profile"
                />
              </Link>
            </li>
            <li className="nav__ul__li">
              <Link to="/settings">
                <img
                  className="nav__img"
                  src={settingsImg}
                  alt="settings"
                  title="settings"
                />
              </Link>
            </li>
          </React.Fragment>
        ) : null}
        <li className="nav__ul__li">{context ? loggedIn : loggedOut}</li>
      </ul>
    </nav>
  );
};

export default withRouter(Navigation);

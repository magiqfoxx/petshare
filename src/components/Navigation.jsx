import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import searchImg from "../img/icons/search.svg";
import profileImg from "../img/icons/profile.svg";
import settingsImg from "../img/icons/settings.svg";
import logoutImg from "../img/icons/logout.svg";

const Navigation = () => {
  return (
    <nav className="nav">
      <div className="nav__logo" id="logo">
        <Link to="./">PetShare</Link>
      </div>
      <ul className="nav__ul">
        <li className="nav__ul__li">
          <Link to="./search">
            <img className="nav__img" src={searchImg} alt="search" />
          </Link>
        </li>
        <li className="nav__ul__li">
          <Link to="./settings">
            <img className="nav__img" src={settingsImg} alt="settings" />
          </Link>
        </li>
        <li className="nav__ul__li">
          <Link to="./profile">
            <img className="nav__img" src={profileImg} alt="profile" />
          </Link>
        </li>
        <li className="nav__ul__li">
          <Link to="./log-out">
            <img className="nav__img" src={logoutImg} alt="logout" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

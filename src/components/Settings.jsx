import React, { useContext } from "react";
import { UserContext } from "../App";

const Settings = props => {
  const context = useContext(UserContext);
  const renderContent = props => {
    return <h1>Settings</h1>;
  };
  const redirect = () => {
    props.history.push("./");
    return null;
  };
  //renders profile page only if user is logged in
  return context ? renderContent() : redirect();
};

export default Settings;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import firebase from "./components/firebase";

import Navigation from "./components/Navigation";
import Landing from "./components/Landing/Landing";
import About from "./components/About";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings";
import Footer from "./components/Footer";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
        setUser({
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid,
          providerData
        });
      } else {
        // User is signed out.
        // ...
        setUser(null);
      }
    });
  }, []);
  return (
    <UserContext.Provider value={user}>
      <div className="app">
        <Navigation />
        <Route path="/" exact component={Landing} />
        <Route path="/about/" component={About} />
        <Route path="/search/" component={Search} />
        <Route path="/profile/" component={Profile} />
        <Route path="/settings/" component={Settings} />
        <footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;

/*
    <React.Fragment>
      <Navigation />
      <Route path="/" exact component={Landing} />
      <Route path="/about/" component={About} />
      <Route path="/search/" component={Search} />
      <Footer />
    </React.Fragment>
    */

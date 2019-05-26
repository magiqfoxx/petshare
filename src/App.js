import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import firebase, { firestore } from "./components/firebase";

import Navigation from "./components/Navigation";
import Landing from "./components/Landing/Landing";
import About from "./components/About";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings";
import Footer from "./components/Footer";

export const UserContext = React.createContext();

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userPets, setUserPets] = useState([]);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        //grab all the user data from authorisation
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData;

        //sets data when user logs in
        setLoggedUser({
          displayName,
          email,
          uid
        });
        const userRef = firestore.collection("users").doc(uid);

        //grab all the user data from the database
        //and listen for changes (snapshot)
        userRef.onSnapshot(doc => {
          const dataBase = doc.data();
          //updates database data
          setLoggedUser(state => {
            return { ...state }, dataBase;
          });
        });

        //grab all pets for this user
        //and listen for changes - snapshot
        userRef.collection("pets").onSnapshot(pets => {
          const allPets = [];
          pets.forEach(pet => {
            allPets.push({ id: pet.id, ...pet.data() });
          });
          setLoggedUser(state => {
            return { ...state, allPets };
          });
        });
      } else {
        // User is signed out.
        setLoggedUser(null);
      }
    });
  }, []);
  return (
    <UserContext.Provider value={loggedUser}>
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

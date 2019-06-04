import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import firebase, { firestore } from "./components/firebase";

import Navigation from "./components/Navigation";
import Landing from "./components/Landing/Landing";
import About from "./components/About";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import UserProfile from "./components/Profile/UserProfile";
import Settings from "./components/Settings/Settings";
import Footer from "./components/Footer";

export const UserContext = React.createContext();

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        //grab all the user data from authorisation
        const displayName = user.displayName;
        const email = user.email;
        //const emailVerified = user.emailVerified;
        //const photoURL = user.photoURL;
        //const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        //const providerData = user.providerData;

        //sets data when user logs in
        setLoggedUser({
          displayName,
          email,
          uid
        });
        setUser(uid);
        setPets(uid);
        setPosts(uid);
      } else {
        // User is signed out.
        setLoggedUser(null);
      }
    });
  }, []);
  const setUser = uid => {
    //UNSUBSCRIBING?
    const userRef = firestore.collection("users").doc(uid);
    //grab all the user data from the database
    //and listen for changes (snapshot)
    return userRef.onSnapshot(doc => {
      //updates database data
      const dataBase = doc.data();
      setLoggedUser(state => {
        return { ...state }, dataBase;
      });
    });
  };

  const setPets = uid => {
    const userRef = firestore.collection("users").doc(uid);
    //grab all pets for this user
    //and listen for changes - snapshot
    return userRef.collection("pets").onSnapshot(pets => {
      const allPets = [];
      pets.forEach(pet => {
        allPets.push({ id: pet.id, ...pet.data() });
      });
      setLoggedUser(state => {
        return { ...state, allPets };
      });
    });
  };

  const setPosts = uid => {
    const userRef = firestore.collection("users").doc(uid);
    //grab all pets for this user
    //and listen for changes - snapshot
    return userRef.collection("posts").onSnapshot(posts => {
      const allPosts = [];
      posts.forEach(post => {
        allPosts.push({ id: post.id, ...post.data() });
      });
      setLoggedUser(state => {
        return { ...state, allPosts };
      });
    });
  };
  return (
    <UserContext.Provider value={loggedUser}>
      <div className="app">
        <Navigation />
        <Route path="/" exact component={Landing} />
        <Route path="/about/" component={About} />
        <Route path="/search/" component={Search} />
        <Route path="/profile/" component={Profile} />
        <Route path="/settings/" component={Settings} />
        <Route path="/user/:id" component={UserProfile} />
        <Footer />
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

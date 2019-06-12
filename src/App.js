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
import FakeDashboard from "./components/Dashboard/FakeDashboard/FakeDashboard";

export const UserContext = React.createContext();

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const uid = user.uid;

        //sets data when user logs in
        /*setLoggedUser({
          //displayName,
          //email,
          //uid
        });*/
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
    const userRef = firestore.collection("users").doc(uid);
    return userRef.onSnapshot(doc => {
      const dataBase = doc.data();
      setLoggedUser(state => {
        return { ...state }, dataBase;
      });
    });
  };

  const setPets = uid => {
    const userRef = firestore.collection("users").doc(uid);
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
        <Route path="/fake" component={FakeDashboard} />
        <Route path="/profile/" component={Profile} />
        <Route path="/settings/" component={Settings} />
        <Route path="/user/:id" component={UserProfile} />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;

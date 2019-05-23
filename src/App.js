import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Navigation from "./components/Navigation";
import Landing from "./components/Landing/Landing";
import About from "./components/About";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      <Navigation />
      <Route path="/" exact component={Landing} />
      <Route path="/about/" component={About} />
      <Route path="/search/" component={Search} />
      <Route path="/profile/" component={Profile} />
      <footer />
    </div>
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

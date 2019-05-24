import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpcybKbh6nRT0McBzRTBtTcdmJWDrmuAw",
  authDomain: "petshare-308d3.firebaseapp.com",
  databaseURL: "https://petshare-308d3.firebaseio.com",
  projectId: "petshare-308d3",
  storageBucket: "petshare-308d3.appspot.com",
  messagingSenderId: "707224329107",
  appId: "1:707224329107:web:abbc2714f5282185"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const [users, setUsers] = useState([{ name: "user1", posts: 5 }]);
useEffect(() => {
  //onSnapshot => when data changes
  //returns unsubscribe
  return db.collection("users").onSnapshot(snapshot => {
    const docs = [];
    snapshot.forEach(doc => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setUsers(docs);
  });
}, []);

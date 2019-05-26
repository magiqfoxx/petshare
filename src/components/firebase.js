import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

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

export const firestore = firebase.firestore();
console.log(firebase.storage());
export const storage = firebase.storage();

export default firebase;

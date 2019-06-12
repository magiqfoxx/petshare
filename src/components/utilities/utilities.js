import { uploadPetImg } from "./addToStorage";
import {
  addNewUserToDatabase,
  addNewPetToDataBase,
  addNewPetToCollection,
  addNewPostToDataBase
} from "./addToDatabase";
import {
  updateUserInDataBase,
  addPetToLikes,
  removePetFromLikes,
  addUserToFollowed,
  removeUserFromFollowed,
  updatePetInDataBase,
  updatePetInCollection
} from "./updateDatabase";
import {
  removeUserFromDataBase,
  removeAuthUser,
  removeAllOfUsersPetsFromDataBase,
  removePostFromDataBase,
  removePetFromDataBase,
  removePetFromCollection
} from "./removeFromDatabase";
import {
  removeUserImg,
  removeUserStorage,
  removePetImg
} from "./removeFromStorage";

//  DATE  //

export const getDate = () => {
  return Date.now();
};
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novembet",
  "December"
];
export const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  let minutes = date.getMinutes();
  minutes = (minutes < 10 ? "0" : "") + minutes;
  let day = date.getDate();
  let month = months[date.getMonth()];
  day = (day < 10 ? "0" : "") + day;
  return `${date.getHours()}:${minutes} - ${day} ${month} ${date.getFullYear()}`;
};
export const dataChanged = (oldPet, newPet) => {
  if (
    oldPet.name !== newPet.name ||
    oldPet.species !== newPet.species ||
    oldPet.age !== newPet.age ||
    oldPet.description !== newPet.description
  ) {
    return true;
  } else {
    return false;
  }
};
//removeUserImg(userUID); when a new picture is sent

//USERS//
export const addNewUser = newUser => {
  addNewUserToDatabase(newUser);
};
export const updateUser = (userUID, newUser) => {
  updateUserInDataBase(userUID, newUser);
};
export const deleteUser = userUID => {
  //remove user's pets from collection of all pets
  //removeAllOfUsersPetsFromCollection(userUID);

  //necessary to remove the collection
  removeAllOfUsersPetsFromDataBase(userUID);
  removeUserFromDataBase(userUID);
  //removeUserImg(userUID); delete the folder instead
  removeUserStorage(userUID);

  removeAuthUser();
};

//  POSTS   //

export const addNewPost = (userUID, newPost) => {
  return addNewPostToDataBase(userUID, newPost);
};
export const removePost = (userUID, postID) => {
  removePostFromDataBase(userUID, postID);
};

//  LIKES  //
const addToLikes = (userUID, ownerID, likeID, likedPet) => {
  addPetToLikes(userUID, ownerID, likeID, likedPet);
};
const removeFromLikes = (userUID, ownerID, likeID, likedPet) => {
  removePetFromLikes(userUID, ownerID, likeID, likedPet);
};

//  FOLLOWS   //
const addToFollowed = (userUID, followedUID, followedUser) => {
  //Add a collection of followed with a new doc
  addUserToFollowed(userUID, followedUID, followedUser);
};
const removeFromFollowed = (userUID, followedUID, followedUser) => {
  //Remove followed user doc by their id
  removeUserFromFollowed(userUID, followedUID, followedUser);
};

//  PETS    //
export const addNewPet = async (userUID, newPet, image) => {
  const petRef = await addNewPetToDataBase(userUID, newPet);
  const petUID = petRef.id;
  //addNewPetToCollection(petUID, newPet);
  uploadPetImg(userUID, petUID, image); //also adds refs to DB
};
export const updatePetData = (userUID, petUID, newPet) => {
  updatePetInDataBase(userUID, petUID, newPet);
  //updatePetInCollection(petUID, newPet);
};

export const removePet = (userUID, petUID) => {
  removePetFromDataBase(userUID, petUID);
  //removePetFromCollection(petUID);
  removePetImg(userUID, petUID);
};

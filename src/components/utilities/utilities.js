import { uploadPetImg } from "./addToStorage";
import { addNewPetToDataBase, addNewPetToCollection } from "./addToDatabase";
import { updatePetInDataBase, updatePetInCollection } from "./updateDatabase";
import {
  removeUserFromDataBase,
  removeAuthUser,
  removeAllOfUsersPetsFromCollection,
  removePetFromDataBase,
  removePetFromCollection
} from "./removeFromDatabase";
import {
  removeUserImg,
  removeUserStorage,
  removePetImg
} from "./removeFromStorage";

export const getDate = () => {
  //const date = new Date();
  //return `${date.getHours()}:${date.getMinutes()} - ${date.getDate()} ${date.getMonth() +
  //1}.${date.getFullYear()}`;
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
export const deleteUser = userUID => {
  //remove user's pets from collection of all pets
  removeAllOfUsersPetsFromCollection(userUID);

  removeUserFromDataBase(userUID);
  //removeUserImg(userUID); delete the folder instead
  removeUserStorage(userUID);

  //REMOVE THE PETS SUBCOLLECTION MANUALLY

  //  REMOVE FROM AUTHORIZED ACCOUNTS!!!
  removeAuthUser();
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

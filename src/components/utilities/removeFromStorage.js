import { storage } from "../firebase";

export const removeUserImg = userUID => {
  //try to remove both file extensions
  try {
    storage.ref(`images/users/${userUID}/${userUID}.jpg`).delete();
    storage.ref(`images/users/${userUID}/${userUID}.png`).delete();
  } catch (error) {
    console.log(error);
  }
};

//    PETS    //
export const removePetImg = (userUID, petUID) => {
  //try to remove both file extensions
  try {
    storage.ref(`images/users/${userUID}/pets/${petUID}.jpg`).delete();
    storage.ref(`images/users/${userUID}/pets/${petUID}.png`).delete();
  } catch (error) {
    console.log(error);
  }
};

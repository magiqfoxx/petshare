import { firestore } from "../firebase";

export const updateUserInDataBase = async (userUID, newUser) => {
  const userRef = await firestore.collection("users").doc(userUID);
  return await userRef
    .collection("users")
    .doc(userUID)
    .update({ ...newUser });
};

//    PETS    //
export const updatePetInDataBase = async (userUID, petUID, newPet) => {
  const userRef = await firestore.collection("users").doc(userUID);
  return await userRef
    .collection("users")
    .doc(userUID)
    .collection("pets")
    .doc(petUID)
    .update({ ...newPet });
};

export const updatePetInCollection = async (newPet, petUID) => {
  return await firestore
    .collection("pets")
    .doc(petUID)
    .update({ ...newPet });
};

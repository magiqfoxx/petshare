import { firestore } from "../firebase";

export const addNewUserToDatabase = newUser => {
  firestore
    .collection("users")
    .doc(newUser.uid)
    .set(newUser, { merge: true });
};
export const addNewPetToDataBase = async (userUID, newPet) => {
  const userRef = await firestore.collection("users").doc(userUID);
  return await userRef.collection("pets").add(newPet);
  //returns ref to the new pet
};
export const addNewPetToCollection = async (newPet, petUID) => {
  return await firestore
    .collection("pets")
    .doc(petUID)
    .set(newPet);
};
export const addImgRefToUser = async (userUID, pictureRef) => {
  const userRef = await firestore.collection("users").doc(userUID);
  await userRef.set(
    {
      img: pictureRef
    },
    { merge: true }
  );
};

export const addImgRefToPet = async (userUID, petUID, pictureRef) => {
  const petRef = await firestore
    .collection("users")
    .doc(userUID)
    .collection("pets")
    .doc(petUID);
  //adds a reference to the picture in user doc
  await petRef.set(
    {
      img: pictureRef,
      id: petUID
    },
    { merge: true }
  );
};
export const addImgRefToPetCollection = async (petUID, pictureRef) => {
  const petRef = await firestore.collection("pets").doc(petUID);
  //adds a reference to the picture in collection of all pets
  await petRef.set(
    {
      img: pictureRef,
      id: petUID
    },
    { merge: true }
  );
};

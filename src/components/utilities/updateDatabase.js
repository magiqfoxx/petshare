import firebase, { firestore } from "../firebase";

export const updateUserInDataBase = async (userUID, newUser) => {
  const userRef = await firestore.collection("users").doc(userUID);
  return await userRef.update(newUser);
};
export const addPetToLikes = async (userUID, newLike) => {
  const userRef = firestore.collection("users").doc(userUID);

  await userRef.update({
    likes: firebase.firestore.FieldValue.arrayUnion(newLike)
  });
};
export const removePetFromLikes = async (userUID, like) => {
  const userRef = firestore.collection("users").doc(userUID);
  await userRef.update({
    likes: firebase.firestore.FieldValue.arrayRemove(like)
  });
};
export const addUserToFollowed = async (userUID, followUID) => {
  const userRef = firestore.collection("users").doc(userUID);

  await userRef.update({
    followed: firebase.firestore.FieldValue.arrayUnion(followUID)
  });
};
export const removeUserFromFollowed = async (userUID, followUID) => {
  const userRef = firestore.collection("users").doc(userUID);
  await userRef.update({
    followed: firebase.firestore.FieldValue.arrayRemove(followUID)
  });
};
//    PETS    //
export const updatePetInDataBase = async (userUID, petUID, newPet) => {
  const userRef = await firestore.collection("users").doc(userUID);
  return await userRef
    .collection("pets")
    .doc(petUID)
    .update(newPet);
};

export const updatePetInCollection = async (petUID, newPet) => {
  return await firestore
    .collection("pets")
    .doc(petUID)
    .update(newPet);
};

import firebase, { firestore } from "../firebase";

//USER//
export const updateUserInDataBase = async (userUID, newUser) => {
  const userRef = await firestore.collection("users").doc(userUID);
  return await userRef.update(newUser);
};

//  LIKES   //
export const addPetToLikes = async (userUID, ownerID, likeID, likedPet) => {
  const userRef = firestore.collection("users").doc(userUID);
  await userRef.update({
    likes: firebase.firestore.FieldValue.arrayUnion(likedPet)
  });
  const likeRef = firestore
    .collection("users")
    .doc(ownerID)
    .collection("pets")
    .doc(likeID);
  await likeRef.update({
    likedBy: firebase.firestore.FieldValue.arrayUnion(userUID)
  });
};
export const removePetFromLikes = async (
  userUID,
  ownerID,
  likeID,
  likedPet
) => {
  const userRef = firestore.collection("users").doc(userUID);
  await userRef.update({
    likes: firebase.firestore.FieldValue.arrayRemove(likedPet)
  });
  const likeRef = firestore
    .collection("users")
    .doc(ownerID)
    .collection("pets")
    .doc(likeID);
  await likeRef.update({
    likedBy: firebase.firestore.FieldValue.arrayRemove(userUID)
  });
};

//  FOLLOWS   //
export const addUserToFollowed = async (userUID, followUID, followedUser) => {
  const userRef = firestore.collection("users").doc(userUID);
  await userRef.update({
    follows: firebase.firestore.FieldValue.arrayUnion(followedUser)
  });
  const followRef = firestore.collection("users").doc(followUID);
  await followRef.update({
    followedBy: firebase.firestore.FieldValue.arrayUnion(userUID)
  });
};
export const removeUserFromFollowed = async (
  userUID,
  followUID,
  followedUser
) => {
  const userRef = firestore.collection("users").doc(userUID);
  await userRef.update({
    follows: firebase.firestore.FieldValue.arrayRemove(followedUser)
  });
  const followRef = firestore.collection("users").doc(followUID);
  await followRef.update({
    followedBy: firebase.firestore.FieldValue.arrayRemove(userUID)
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

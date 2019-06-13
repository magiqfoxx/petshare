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
export const addUserToFollowed = async (userUID, followedUID, followedUser) => {
  //FOR CLOUD FUNCTIONS
  const CollectionUserRef = firestore
    .collection("users")
    .doc(userUID)
    .collection("follows");
  CollectionUserRef.doc(followedUID).set(followedUser);

  //FOR FASTER READING FROM USER DATABASE
  const userRef = firestore.collection("users").doc(userUID);
  userRef.update({
    follows: firebase.firestore.FieldValue.arrayUnion(followedUser)
  });
};
export const removeUserFromFollowed = async (
  userUID,
  followedUID,
  followedUser
) => {
  //FOR CLOUD FUNCTIONS
  const CollectionUserRef = firestore
    .collection("users")
    .doc(userUID)
    .collection("follows")
    .doc(followedUID);
  CollectionUserRef.delete();

  //FOR FASTER READING FROM USER DATABASE
  const userRef = firestore.collection("users").doc(userUID);
  userRef.update({
    follows: firebase.firestore.FieldValue.arrayRemove(followedUser)
  });
  /* moved to cloud functions
  const followRef = firestore.collection("users").doc(followedUID);
  followRef.update({
    followedBy: firebase.firestore.FieldValue.arrayRemove(userUID)
  });*/
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

import { firestore } from "../firebase";

//USER//
export const addNewUserToDatabase = newUser => {
  firestore
    .collection("users")
    .doc(newUser.uid)
    .set(newUser, { merge: true });
};

//POSTS
export const addNewPostToDataBase = async (userUID, newPost) => {
  const postsRef = firestore
    .collection("users")
    .doc(userUID)
    .collection("posts");

  const post = await postsRef.add(newPost);
  postsRef.doc(post.id).update({ id: post.id });

  return post.id;
};

//COMMENTS
export const addNewCommentToDataBase = async (
  postAuthorUID,
  postID,
  newComment
) => {
  const commentsRef = firestore
    .collection("users")
    .doc(postAuthorUID)
    .collection("posts")
    .doc(postID)
    .collection("comments");

  const comment = await commentsRef.add(newComment);
  commentsRef.doc(comment.id).update({ id: comment.id });

  return comment.id;
};

//PETS//
export const addNewPetToDataBase = async (userUID, newPet) => {
  const userRef = await firestore.collection("users").doc(userUID);
  return await userRef.collection("pets").add(newPet);
  //returns ref to the new pet
};
export const addNewPetToCollection = async (petUID, newPet) => {
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
export const addImgRefToPost = async (userUID, postID, pictureRef) => {
  const userRef = await firestore
    .collection("users")
    .doc(userUID)
    .collection("posts")
    .doc(postID);
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

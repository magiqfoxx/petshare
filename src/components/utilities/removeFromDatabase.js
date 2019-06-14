import firebase, { firestore } from "../firebase";

//USER//
export const removeUserFromDataBase = userUID => {
  firestore
    .collection("users")
    .doc(userUID)
    .delete();
};
export const removeAuthUser = () => {
  const user = firebase.auth().currentUser;

  user
    .delete()
    .then(function() {
      // User deleted.
    })
    .catch(function(error) {
      // An error happened.
    });
};
export const removeAllOfUsersPetsFromDataBase = userUID => {
  firestore
    .collection("users")
    .doc(userUID)
    .collection("pets")
    .get()
    .then(pets => {
      pets.forEach(pet => {
        removePetFromCollection(pet.id);
      });
    })
    .catch(error => console.log(error));
};
//POSTS//
export const removePostFromDataBase = async (userUID, postID) => {
  firestore
    .collection("users")
    .doc(userUID)
    .collection("posts")
    .doc(postID)
    .delete();
};

//COMMENTS
export const removeCommentFromDataBase = async (
  postAuthorUID,
  postID,
  commentID
) => {
  firestore
    .collection("users")
    .doc(postAuthorUID)
    .collection("posts")
    .doc(postID)
    .collection("comments")
    .doc(commentID)
    .delete();
};
//  PETS  //
export const removePetFromDataBase = (userUID, petUID) => {
  firestore
    .collection("users")
    .doc(userUID)
    .collection("pets")
    .doc(petUID)
    .delete();
};
export const removePetFromCollection = petUID => {
  firestore
    .collection("pets")
    .doc(petUID)
    .delete();
};

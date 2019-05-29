import { firestore } from "../firebase";

export const removeUserFromDataBase = userUID => {
  firestore
    .collection("users")
    .doc(userUID)
    .delete();
};
export const removeAllOfUsersPetsFromCollection = userUID => {
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

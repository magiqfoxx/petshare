import { firestore, storage } from "../firebase";

export const uploadUserImg = async (userUID, image) => {
  const fileType = getExtension(image);
  const storageRef = storage.ref(`images/users/${userUID}.${fileType}`);
  const pictureRef = await uploadImg(storageRef, image);

  const userRef = firestore.collection("users").doc(userUID);
  //adds a reference to the picture in user doc
  await userRef.set(
    {
      img: pictureRef
    },
    { merge: true }
  );
};
export const uploadPetImg = async (
  petUID,
  image,
  userUID,
  petCollectionUID
) => {
  //CHANGE THE FILING TO USERUID/USERUID.IMG AND USERUID/PETS/PETUID.IMG ?
  const fileType = getExtension(image);
  const storageRef = storage.ref(`images/users/pets/${petUID}.${fileType}`);
  const pictureRef = await uploadImg(storageRef, image);

  const petRef = firestore
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

  const petCollectionRef = firestore.collection("pets").doc(petCollectionUID);
  //adds a reference to the picture in pets doc
  await petCollectionRef.set(
    {
      img: pictureRef,
      id: petCollectionUID
    },
    { merge: true }
  );
};

export const uploadImg = async (storageRef, image) => {
  //adds the picture at the specified reference/place
  await storageRef.put(image);
  const pictureImg = await storageRef.getDownloadURL();

  //returns download link to that picture
  return pictureImg;
};

export const getExtension = image => {
  return image.name.split(".").pop();
};

export const addNewPet = async (user, newPet) => {
  const userRef = firestore.collection("users").doc(user.uid);
  return await userRef.collection("pets").add(newPet);
};

export const addToPetCollection = async newPet => {
  return await firestore.collection("pets").add(newPet);
};

import { storage } from "../firebase";

import {
  addImgRefToUser,
  addImgRefToPet,
  addImgRefToPetCollection
} from "./addToDatabase";

const getExtension = image => {
  return image.name.split(".").pop();
};
const uploadImg = async (storageRef, image) => {
  //adds the picture at the specified reference/place
  await storageRef.put(image);
  const pictureImg = await storageRef.getDownloadURL();

  //returns download link to that picture
  return pictureImg;
};
export const uploadUserImg = async (userUID, image) => {
  const fileType = getExtension(image);
  const storageRef = storage.ref(
    `images/users/${userUID}/${userUID}.${fileType}`
  );
  const pictureRef = await uploadImg(storageRef, image);

  addImgRefToUser(userUID, pictureRef);
};

export const uploadPetImg = async (userUID, petUID, image) => {
  const fileType = getExtension(image);
  const storageRef = storage.ref(
    `images/users/${userUID}/pets/${petUID}.${fileType}`
  );
  const pictureRef = await uploadImg(storageRef, image);

  addImgRefToPet(userUID, petUID, pictureRef);
  addImgRefToPetCollection(petUID, pictureRef);
};

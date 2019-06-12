const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.newFollow = functions.firestore
  .document("users/{userUID}/follows/{followedUID}")
  .onCreate((snap, context) => {
    //context.params stores userUID and followedUID
    const newFollower = snap.data(); //holds uid, name and img
    const uid = newFollower.uid;

    return admin
      .firestore()
      .collection("users")
      .doc(context.params.followedUID)
      .collection("posts")
      .get()
      .then(posts => {
        return posts.forEach(post => {
          return post.ref.update("followedBy", [context.params.userUID]);
        });
      })
      .catch(error => console.log(error));
  });

exports.deleteFollow = functions.firestore
  .document("users/{userUID}/follows/{followedUID}")
  .onDelete((snap, context) => {
    //context.params stores userUID and followedUID

    return admin
      .firestore()
      .collection("users")
      .doc(context.params.followedUID)
      .collection("posts")
      .get()
      .then(posts => {
        return posts.forEach(post => {
          let oldArr = post.data().ref.followedBy;
          let newArr = oldArr.splice(oldArr.indexOf(context.params.userUID), 1);
          return post.ref.update("followedBy", newArr);
        });
      })
      .catch(error => console.log(error));
  });

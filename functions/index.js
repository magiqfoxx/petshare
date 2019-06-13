const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.newFollow = functions.firestore
  .document("users/{userUID}/follows/{followedUID}")
  .onCreate((snap, context) => {
    //context.params stores userUID and followedUID
    const newFollower = snap.data(); //holds uid, name and img
    const uid = newFollower.uid;

    //for the array field in user doc
    admin
      .firestore()
      .collection("users")
      .doc(context.params.followedUID)
      .get()
      .then(doc => {
        let oldArr = doc.data().followedBy;
        let newArr = [...oldArr, context.params.userUID];
        return doc.ref.update("followedBy", newArr);
      })
      .catch(error => console.log(error));

    //for the collection
    return admin
      .firestore()
      .collection("users")
      .doc(context.params.followedUID)
      .collection("posts")
      .get()
      .then(posts => {
        return posts.forEach(post => {
          let oldArr = post.data().followedBy;
          return post.ref.update("followedBy", [
            ...oldArr,
            context.params.userUID
          ]);
        });
      })
      .catch(error => console.log(error));
  });

exports.deleteFollow = functions.firestore
  .document("users/{userUID}/follows/{followedUID}")
  .onDelete((snap, context) => {
    //context.params stores userUID and followedUID

    //for the array field in user doc
    admin
      .firestore()
      .collection("users")
      .doc(context.params.followedUID)
      .get()
      .then(doc => {
        let oldArr = doc.data().followedBy;
        let newArr = oldArr.splice(oldArr.indexOf(context.params.userUID), 1);
        //HOW DOES THIS WORK????
        return doc.ref.update("followedBy", oldArr);
      })
      .catch(error => console.log(error));

    //for the collection
    return admin
      .firestore()
      .collection("users")
      .doc(context.params.followedUID)
      .collection("posts")
      .get()
      .then(posts => {
        return posts.forEach(post => {
          let oldArr = post.data().followedBy;
          let newArr = oldArr.splice(oldArr.indexOf(context.params.userUID), 1);
          //HOW DOES THIS WORK????
          return post.ref.update("followedBy", oldArr);
        });
      })
      .catch(error => console.log(error));
  });

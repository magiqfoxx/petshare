const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.newFollow = functions.firestore
  .document("users/{userUID}/follows/{followedUID}")
  .onCreate((snap, context) => {
    //context.params stores userUID and followedUID
    const newFollower = snap.data(); //holds uid, name and img
    const uid = newFollower.uid;

    var ref = admin.database().ref(`users/${context.params.followedUID}/posts`);
    return ref
      .once("value")
      .then(snapshot => {
        return snapshot.forEach(post => {
          return post.ref.update({
            followedBy: [context.params.userUID] //...followedBy,
          });
        });
      })
      .catch(error => console.log(error));
    //admin.database().ref(`users/${context.params.followedUID}`).once('value').then(function(snapshot){....
  });

exports.deleteFollow = functions.firestore
  .document("users/{userUID}/follows/{followedUID}")
  .onDelete((snap, context) => {
    //context.params stores userUID and followedUID

    var ref = admin.database().ref(`users/${context.params.followedUID}/posts`);
    return ref
      .once("value")
      .then(snapshot => {
        return snapshot.forEach(post => {
          return post.ref.update({
            followedBy: followedBy.splice(followedBy.indexOf(usrUID), 1)
          });
        });
      })
      .catch(error => console.log(error));
  });

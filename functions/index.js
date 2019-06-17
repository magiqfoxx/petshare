const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

/*Writes user into an array at users/id/followedBy
which is then used for querrying*/
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

/* On comment creating: Adds the last three comments to the /users/is/posts/postID
For less querrying */
exports.newComment = functions.firestore
  .document("users/{userUID}/posts/{postID}/comments/{commentID}")
  .onCreate((snap, context) => {
    //Get last 3 comments
    return (
      admin
        .firestore()
        .collection("users")
        .doc(context.params.userUID)
        .collection("posts")
        .doc(context.params.postID)
        .collection("comments")
        .orderBy("date", "desc")
        .limit(3)
        .get()
        //set lastComments in post doc
        .then(docs => {
          let lastComments = [];
          docs.forEach(doc => {
            lastComments.push(doc.data());
          });

          return admin
            .firestore()
            .collection("users")
            .doc(context.params.userUID)
            .collection("posts")
            .doc(context.params.postID)
            .get()
            .then(doc => {
              return doc.ref.update({
                lastComments: lastComments,
                dateOfLastComment: lastComments[lastComments.length - 1].date
              });
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error))
    );
  });

exports.commentDeleted = functions.firestore
  .document("users/{userUID}/posts/{postID}/comments/{commentID}")
  .onDelete((snap, context) => {
    //Get last 3 comments
    return (
      admin
        .firestore()
        .collection("users")
        .doc(context.params.userUID)
        .collection("posts")
        .doc(context.params.postID)
        .collection("comments")
        .orderBy("date", "desc")
        .limit(3)
        .get()
        //set lastComments in post doc
        .then(docs => {
          let lastComments = [];
          docs.forEach(doc => {
            lastComments.push(doc.data());
          });
          return admin
            .firestore()
            .collection("users")
            .doc(context.params.userUID)
            .collection("posts")
            .doc(context.params.postID)
            .get()
            .then(doc => {
              return doc.ref.update({
                lastComments: lastComments,
                dateOfLastComment: lastComments[lastComments.length - 1].date
              });
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error))
    );
  });

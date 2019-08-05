import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAQDtdbNwy5-7FA8gHpQ6jcgehxnN_eQg4",
  authDomain: "e-commerce-23e53.firebaseapp.com",
  databaseURL: "https://e-commerce-23e53.firebaseio.com",
  projectId: "e-commerce-23e53",
  storageBucket: "",
  messagingSenderId: "167191075628",
  appId: "1:167191075628:web:9172d74d26b1df5d"
};

// FIRESTORE
// QueryReference
// QuerySnapshot

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error createing user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

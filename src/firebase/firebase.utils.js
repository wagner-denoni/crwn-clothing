import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCr7yp5iiUuPDfk05q8RfXv8n5tpbq7xG8",
    authDomain: "crwn-clothing-88252.firebaseapp.com",
    databaseURL: "https://crwn-clothing-88252.firebaseio.com",
    projectId: "crwn-clothing-88252",
    storageBucket: "crwn-clothing-88252.appspot.com",
    messagingSenderId: "1045385485183",
    appId: "1:1045385485183:web:d444375a679cae3aa3984a"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`/users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
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
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCUVExBS8-J9U458sNtB95fwzQNBPSl5Rk",
    authDomain: "mctracker-42d0f.firebaseapp.com",
    databaseURL: "https://mctracker-42d0f.firebaseio.com",
    projectId: "mctracker-42d0f",
    storageBucket: "mctracker-42d0f.appspot.com",
    messagingSenderId: "218378060918"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;

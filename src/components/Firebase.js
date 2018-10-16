import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBo4R5JBmM8AFwOkILZyvLLDQzwtgKddIg",
    authDomain: "maurice-67ed1.firebaseapp.com",
    databaseURL: "https://maurice-67ed1.firebaseio.com",
    projectId: "maurice-67ed1",
    storageBucket: "maurice-67ed1.appspot.com",
    messagingSenderId: "643923351634"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
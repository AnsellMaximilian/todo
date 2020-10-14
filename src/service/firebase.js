import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';;


const config = {
    apiKey: "AIzaSyCT3sqrLhk8JLRCBY3e3B8Mzh7pb_7BI14",
    authDomain: "todo-35f31.firebaseapp.com",
    databaseURL: "https://todo-35f31.firebaseio.com",
    projectId: "todo-35f31",
    storageBucket: "todo-35f31.appspot.com",
    messagingSenderId: "622139677751",
    appId: "1:622139677751:web:646c1cc0220f10520033b2"
};
firebase.initializeApp(config);

const db = firebase.firestore();

const auth = firebase.auth();

export {db, auth};


import * as firebase from 'firebase';
// eslint-disable-next-line no-unused-vars
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCw1YhcIxkeuCNkqS7OHp1iZ9u7Ai9Rq6k",
    authDomain: "queueingappv1-231a3.firebaseapp.com",
    databaseURL: "https://queueingappv1-231a3.firebaseio.com",
    projectId: "queueingappv1-231a3",
    storageBucket: "queueingappv1-231a3.appspot.com",
    messagingSenderId: "89657605860"
  };
  firebase.initializeApp(config);
/*
const config = {
  

  apiKey: "AIzaSyD2XpsqHFPix300di00XPWG_io-cQDQiVA",
    authDomain: "stories-332e5.firebaseapp.com",
    databaseURL: "https://stories-332e5.firebaseio.com",
    projectId: "stories-332e5",
    storageBucket: "stories-332e5.appspot.com",
    messagingSenderId: "608336632546"
};
firebase.initializeApp(config);*/

firebase.firestore().settings(settings);

export default firebase;

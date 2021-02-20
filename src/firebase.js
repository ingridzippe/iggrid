import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCJ-q90-P7x1Bb7qOD7jNutcsjtfwGEgp4",
  authDomain: "gridsystem-7aba2.firebaseapp.com",
  databaseURL: "https://gridsystem-7aba2-default-rtdb.firebaseio.com",
  projectId: "gridsystem-7aba2",
  storageBucket: "gridsystem-7aba2.appspot.com",
  messagingSenderId: "308725097152",
  appId: "1:308725097152:web:ec1491f20548332c734325",
  measurementId: "G-NPY4XSW6H8"
};

var firebaseApp = firebase.initializeApp(firebaseConfig);

export {firebaseApp};
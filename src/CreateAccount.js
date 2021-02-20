import React, { Component, useRef } from 'react';
import { Redirect } from "react-router-dom";
import {firebaseApp} from "./firebase.js";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

var firebaseDatabase = firebaseApp.database();
var firebaseStorageRef = firebase.storage().ref();

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      email: "",
      password: "",
      userid: null
    };
    this.createAccount = this.createAccount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    var newState = {};
    newState[event.target.type] = event.target.value;
    this.setState(newState);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.email)
    console.log(this.state.password)
    this.addUserToDatabase();
  }
  addUserToDatabase(array) {
    // **** check if user with this email exists
    // check old user count
    var userCountRef = firebase.database().ref('/userCount');
    userCountRef.on('value', (snapshot) => {
      const userCount = snapshot.val();
      const newUserCount = userCount.userCount;
      console.log(newUserCount)
      // update user count
      firebaseDatabase.ref('/userCount').set({
        userCount: newUserCount
      })
      // add new user to database
      firebaseDatabase.ref('/users/' + newUserCount).set({
        email: this.state.email,
        password: this.state.password
      })
    });
  }
  updateUserCount() {
    firebaseDatabase.ref('/userCount').set({
      userCount: 0
    })
  }
  createAccount() {
    console.log(this.state.email)
    console.log(this.state.password)
    this.setState({ redirect: '/createaccount' });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div>
        <div>Create Account</div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <input type="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
          <br /><br />
          <input type="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter password" />
          <br /><br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateAccount;
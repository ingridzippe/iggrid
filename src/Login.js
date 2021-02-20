import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import {firebaseApp} from "./firebase.js";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

var firebaseDatabase = firebaseApp.database();
var firebaseStorageRef = firebase.storage().ref();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userValid: false,
      redirect: null,
      userid: null
    };
    this.userLoginFunction = this.userLoginFunction.bind(this);
    this.goToCreateAccount = this.goToCreateAccount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findUser = this.findUser.bind(this);
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
    this.findUser();
  }
  findUser(array) {
    var users = firebase.database().ref('/users');
    users.on('value', (snapshot) => {
      const users = snapshot.val();
      console.log(users)
      for (var i=0; i<users.length; i++) {
        if (users[i].email == this.state.email) {
          console.log('user found at index: ' + i)
          if (users[i].password == this.state.password) {
            console.log('login');
            this.setState({ redirect: `/main?id=${i}`, userid: i });
          } else {
            console.log('user found, password incorrect')
          }
        } else {
          console.log('email not found.')
        }
      }
    // firebase.database().ref('/users').child('user').orderByChild('email').equalTo(this.state.email).once('value', function(snapshot) {
    //     var snap = snapshot.val();
    //     console.log(snap)
    // });

      // const newUserCount = userCount.userCount;
      // console.log(newUserCount)
      // // update user count
      // firebaseDatabase.ref('/userCount').set({
      //   userCount: newUserCount
      // })
      // // add new user to database
      // firebaseDatabase.ref('/users/' + newUserCount).set({
      //   email: this.state.email,
      //   password: this.state.password
      // })
    });

  }


  goToCreateAccount() {
    console.log('createaccount')
    this.setState({ redirect: '/createaccount' });
  }
  userLoginFunction() {
    console.log("login")
    var userid = 1;
    this.setState({ userValid: true });
    if (this.state.userValid) {
      this.setState({ redirect: `/main/${userid}` });
    } else {
      console.log("user invalid");
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div>
        {/* <button onClick={this.findUser}>find user</button><br /><br /> */}
        <div>Login</div><br />
        <form onSubmit={this.handleSubmit}>
          <input type="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
          <br /><br />
          <input type="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter password" />
          <br /><br />
          <input type="submit" value="Submit" />
        </form>
        <br /><br />
        <button onClick={this.goToCreateAccount}>Create Account</button>
      </div>
    );
  }
}

export default Login;
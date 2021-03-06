import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import navbarLogo from "../../logos/navbar-logo.png"
import './Login.css';
import google from '../../logos/google.jpg'

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email };
        setLoggedInUser(signedInUser);
        history.replace(from);
        // ...
      })
      .catch(function (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div className="login">
      <div className="login__header">
        <img src={navbarLogo} alt="" />
      </div>
      <div className="login__section">
        <h3>Login with</h3>
        <div className="login__btn">
          <button onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
      </div>
      {/* <h1>This is Login</h1>
      <button onClick={handleGoogleSignIn}>Google Sign in</button> */}
    </div>
  );
};

export default Login;

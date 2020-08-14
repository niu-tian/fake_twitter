const react = require("react");
import React from 'react';
import NavigationBar from '../components/NavigationBar.js';
import LoginForm from '../components/LoginForm.js';


export default class LoginPage extends react.Component {
  render() {
    return (
      <div>
        <NavigationBar title="Login" showRegisterButton={true} />
        <LoginForm />
      </div>
    );
  }
}
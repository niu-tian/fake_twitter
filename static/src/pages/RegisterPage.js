const react = require("react");
import React from 'react';
import NavigationBar from '../components/NavigationBar.js';
import RegisterForm from '../components/RegisterForm.js';

export default class RegisterPage extends react.Component {
  render() {
    return (
      <div>
        <NavigationBar
          title="Register"
          showLoginButton={true}
        />
        <RegisterForm />
      </div>);
  }
}
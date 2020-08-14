const react = require("react");
import React from 'react'
import NavigationBar from '../components/NavigationBar.js'

export default class Home extends react.Component {
  render() {
    return (
    <div>
      <NavigationBar
            title={'Welcome to Fake Twitter!'}
            showLoginButton={true}
      />
    </div>
    );
  }
}
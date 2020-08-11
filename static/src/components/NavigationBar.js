const react = require("react");
import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';

export default class NavigationBar extends react.Component {

  render() {
    let loginButton = this.props.showLoginButton ?
      (
        <Link to='/login'>
          <Button variant="contained" color="primary" >
            Login
          </Button>
        </Link>
      ) : null;
    let registerButton = this.props.showRegisterButton ?
      (
        <Link to='/register'>
          <Button variant="contained" color="primary" >
            Register
          </Button>
        </Link>
      ) : null;
    return <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"  >
          <Link to='/'><HomeIcon style={{fill: "white"}}  /></Link>
        </IconButton>
        <Typography variant="h6">{this.props.title}</Typography>
        {loginButton}
        {registerButton}
      </Toolbar>
    </AppBar>;
  }
}

NavigationBar.defaultProps = {
  showLoginButton: false,
  showRegisterButton: false,
}
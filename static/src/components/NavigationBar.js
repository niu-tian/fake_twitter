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
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core/styles';
import { BASE_URL } from '../global.js';

const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
};

class NavigationBar extends react.Component {
  handleLogout() {
    const userInfo = {
      token: this.props.cookies.get('token'),
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)
    };
    let url = BASE_URL + 'logout/';
    fetch(url, requestOptions)
      .catch(_ => _);
    this.props.cookies.remove('token');
    this.props.cookies.remove('firstname');
  }

  render() {
    const { classes } = this.props;
    let firstname = this.props.cookies.get('firstname');
    let loginButton = !firstname && this.props.showLoginButton ?
      (
        <Link to='/login'>
          <Button variant="contained" color="primary" >
            Login
          </Button>
        </Link>
      ) : null;
    let registerButton = !firstname && this.props.showRegisterButton ?
      (
        <Link to='/register'>
          <Button variant="contained" color="primary" >
            Register
          </Button>
        </Link>
      ) : null;
    let logoutButton = firstname ?
      (
        <Link to='/'>
          <Button variant="contained" color="primary"  onClick={this.handleLogout.bind(this)}>
            Logout
          </Button>
        </Link>
      ) : null;
    let welcomeMessage = firstname ?
      (
        <Typography variant="body1">Logged in as {firstname}</Typography>
      ) : null;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu"  >
              <Link to='/'>
                <HomeIcon style={{fill: "white"}}  />
              </Link>
            </IconButton>
            <Typography variant="h6" className={classes.title}>{this.props.title}</Typography>
            {loginButton}
            {registerButton}
            {welcomeMessage}
            {logoutButton}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavigationBar.defaultProps = {
  showLoginButton: false,
  showRegisterButton: false,
}

NavigationBar.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
}

export default withCookies(withStyles(styles)(NavigationBar));
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { BASE_URL } from '../global.js';
import { PASSWORD_NOT_MATCH, MISSING_FIELD } from '../literal.js';
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePwdChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleSubmit = () => {
    if (firstname === "" || lastname === "" || email === "" || password === "" || confirmPassword === "") {
      setMessage(MISSING_FIELD);
      return;
    }
    if (password !== confirmPassword) {
      setMessage(PASSWORD_NOT_MATCH);
      return;
    }
    const newUserInfo = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserInfo)
    };
    let url = BASE_URL + 'register/';
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          history.push('/login/');
        } else {
          setMessage(data.message);
        }
      })
      .catch(e => {
        setMessage(e);
      });
  }
  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField required label="First Name" onChange={handleFirstnameChange} />
        <TextField required label="Last Name" onChange={handleLastnameChange} />
      </div>
      <div>
        <TextField required label="Email" onChange={handleEmailChange} />
      </div>
      <div>
        <TextField required label="Password" type="password" onChange={handlePwdChange} />
        <TextField required label="Re-enter Password" type="password" onChange={handleConfirmPasswordChange}/>
      </div>
      <div>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>Submit</Button>
      </div>
      <div>
        {message}
      </div>
    </form>);
}


export default RegisterForm;
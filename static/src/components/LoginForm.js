import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { BASE_URL } from '../global.js';
import { MISSING_FIELD } from '../literal.js';
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePwdChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (email === "" || password === "") {
      setMessage(MISSING_FIELD);
      return;
    }
    const newUserInfo = {
      email: email,
      password: password,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserInfo)
    };
    let url = BASE_URL + 'login/';
    fetch(url, requestOptions)
      .then(response => response.json())
      .then((data) => {
        if (data.success) {
          history.push('/');
        } else {
          setMessage(data.message);
        }
      })
      .catch(e => setMessage(e));
  };

  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField required label="Email" onChange={handleEmailChange} />
      </div>
      <div>
        <TextField required label="Password" type="password" onChange={handlePwdChange} />
      </div>
      <div>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>Submit</Button>
      </div>
      <div>
        {message}
      </div>
    </form>);
}

export default LoginForm;
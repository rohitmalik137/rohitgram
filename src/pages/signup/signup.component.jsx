import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import '../login/login.styles.scss';
import Input from '../../components/input/input.component';
import { register } from '../../redux/actions/auth.actions';

const SignupPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      email: email,
      username: username,
      password: password,
    };
    dispatch(register(newUser));
  };

  return (
    <div className="loginContainer">
      <div className="loginContainer--upper overall">
        <h1 className="login-heading">Rohitgram</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Input
            type="submit"
            value="Sign Up"
            isButton
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
      </div>
      <div className="loginContainer--lower overall">
        <p style={{ color: 'skyblue' }}>
          Have an account? <Link to="/">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

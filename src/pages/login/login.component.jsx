import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './login.styles.scss';
import Input from '../../components/input/input.component';
import { login } from '../../redux/actions/auth.actions';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [uname_or_email, setUnameOrEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginUser = {
      uname_or_email,
      password,
    };
    dispatch(login(loginUser));
  };

  return (
    <div className="loginContainer">
      <div className="loginContainer--upper">
        <h1 className="login-heading">Rohitgram</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="uname_or_email"
            placeholder="Username or email"
            onChange={(event) => setUnameOrEmail(event.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Input
            type="submit"
            value="Login"
            isButton
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
        <p>Forgot Password?</p>
      </div>
      <div className="loginContainer--lower">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

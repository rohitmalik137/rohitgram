import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './login.styles.scss';
import Input from '../../components/input/input.component';
import { loadUser, login } from '../../redux/actions/auth.actions';
import { clearErrors } from '../../redux/actions/error.actions';

const LoginPage = () => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.error.msg);
  const msg = errors && errors.msg;
  const [uname_or_email, setUnameOrEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginUser = {
      uname_or_email,
      password,
    };
    dispatch(login(loginUser));
  };

  return (
    <div className="loginContainer">
      <div className="loginContainer--upper overall">
        <h1 className="login-heading">Rohitgram</h1>
        {msg && <div className="error">{msg}</div>}
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
      <div className="loginContainer--lower overall">
        <p style={{ color: 'skyblue' }}>
          Don't have an account?{' '}
          <Link to="/accounts/signup" onClick={() => dispatch(clearErrors())}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

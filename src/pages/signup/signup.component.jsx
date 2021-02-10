import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../login/login.styles.scss';
import Input from '../../components/input/input.component';
import { register } from '../../redux/actions/auth.actions';
import { clearErrors } from '../../redux/actions/error.actions';

const SignupPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector((state) => state.error.msg);
  const msg = errors && errors.msg;
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    history.push('/accounts/verify');
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
        <h1 className="login-heading">
          F<span style={{ color: 'orange' }}> . </span>R
          <span style={{ color: 'skyblue' }}> . </span>I
          <span style={{ color: 'yellow' }}> . </span>E
          <span style={{ color: 'orange' }}> . </span>N
          <span style={{ color: 'yellow' }}> . </span>D
          <span style={{ color: 'skyblue' }}> . </span>S
        </h1>
        {msg && <div className="error">{msg}</div>}
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
            disabled={!email || !username || !password}
            type="submit"
            value="Sign Up"
            name="submit"
            isButton
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
      </div>
      <div className="loginContainer--lower overall">
        <p style={{ color: 'skyblue' }}>
          Have an account?{' '}
          <Link to="/" onClick={() => dispatch(clearErrors())}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

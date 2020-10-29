import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './login.styles.scss';
import Input from '../../components/input/input.component';
import {
  login,
  verifyUserAfterAccountCreation,
  getResetPassword,
} from '../../redux/actions/auth.actions';
import { clearErrors } from '../../redux/actions/error.actions';
import { Button, Modal } from 'react-bootstrap';

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector((state) => state.error.msg);
  const msg = errors && errors.msg;
  const [uname_or_email, setUnameOrEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [mailForVerification, setMailForVerification] = useState(null);
  const [mailForForgotPassword, setMailForForgotPassword] = useState(null);
  const [showVerify, setShowVerify] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleCloseVerify = () => setShowVerify(false);
  const handleShowVerify = () => setShowVerify(true);
  const handleCloseForgot = () => setShowForgot(false);
  const handleShowForgot = () => setShowForgot(true);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginUser = {
      uname_or_email,
      password,
    };
    dispatch(login(loginUser));
  };

  const verifyMailSubmit = (event) => {
    event.preventDefault();
    history.push('/accounts/verify');
    dispatch(verifyUserAfterAccountCreation({ mailForVerification }));
  };

  const forgotPasswordSubmit = (event) => {
    event.preventDefault();
    history.push(`/accounts/resetPassword/${mailForForgotPassword}`);
    dispatch(getResetPassword({ mailForForgotPassword }));
  };

  return (
    <>
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
              disabled={!uname_or_email || !password}
              type="submit"
              value="Login"
              name="submit"
              isButton
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
          <span style={{ display: 'flex', justifyContent: 'space-around' }}>
            <p onClick={handleShowForgot} className="loginContainer--options">
              Forgot Password?
            </p>
            <p className="loginContainer--options" onClick={handleShowVerify}>
              Verify Account!
            </p>
          </span>
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

      {/* Forgot Modal */}
      <Modal
        show={showForgot}
        onHide={handleCloseForgot}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <form onSubmit={forgotPasswordSubmit}>
          <Modal.Body>
            <Input
              type="text"
              name="mailForVerification"
              placeholder="Email"
              onChange={(event) => setMailForForgotPassword(event.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Send
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* Verify Modal */}
      <Modal
        show={showVerify}
        onHide={handleCloseVerify}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Verify Account</Modal.Title>
        </Modal.Header>
        <form onSubmit={verifyMailSubmit}>
          <Modal.Body>
            <Input
              type="text"
              name="mailForVerification"
              placeholder="Email"
              onChange={(event) => setMailForVerification(event.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Verify
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default LoginPage;

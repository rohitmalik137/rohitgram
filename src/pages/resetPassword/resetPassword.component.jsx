import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Input from '../../components/input/input.component';
import { postResetPassword } from '../../redux/actions/auth.actions';

import '../login/login.styles.scss';

const ResetPasswordPage = () => {
  const { email } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [otp, setOtp] = useState(null);
  const [npassword, setNpassword] = useState(null);

  const errors = useSelector((state) => state.error.msg);
  const msg = errors && errors.msg;

  const passResetSuccess = useSelector((state) => state.auth.passResetSuccess);

  const postResetPasswordSubmit = (event) => {
    event.preventDefault();
    dispatch(postResetPassword({ email, otp, npassword }));
  };
  return (
    <div className="loginContainer">
      <div className="loginContainer--upper overall">
        <h1 className="login-heading">Reset Password</h1>
        {msg && <div className="error">{msg}</div>}
        {passResetSuccess && (
          <div
            style={{
              backgroundColor: '#67df67',
              color: 'white',
              padding: '5px',
              marginBottom: '15px',
            }}
          >
            {passResetSuccess}
          </div>
        )}
        <form onSubmit={postResetPasswordSubmit}>
          <Input disabled={true} value={email} />
          <Input
            type="text"
            name="otp"
            placeholder="OTP sent a your Email"
            onChange={(event) => setOtp(event.target.value)}
          />
          <Input
            type="password"
            name="npassword"
            placeholder="Set new password"
            onChange={(event) => setNpassword(event.target.value)}
          />
          <Input
            disabled={passResetSuccess || !otp || !npassword}
            type="submit"
            value="Reset"
            name="reset"
            isButton
          />
        </form>
        <p
          className="loginContainer--options"
          onClick={() => {
            history.push('/');
          }}
        >
          Didn't receive mail or User Another Email!?
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../../userInfo/user-card/user-card.component';
import Input from '../../input/input.component';

import './change-password.styles.scss';
import { useState } from 'react';
import { changePassword } from '../../../redux/actions/auth.actions';

const ChangePassword = () => {
  const [cpassword, setCpassword] = useState(null);
  const [npassword, setNpassword] = useState(null);
  const [cnpassword, setCnpassword] = useState(null);
  const dispatch = useDispatch();

  const errors = useSelector((state) => state.error.msg);
  const msg = errors && errors.msg;

  const passResetSuccess = useSelector((state) => state.auth.passResetSuccess);

  const user = useSelector((state) => state.auth.user);
  const profileUrl = user ? user.profileUrl : null;
  const username = user ? user.username : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changePassword({ username, cpassword, npassword, cnpassword }));
  };

  return (
    <div className="changePasswordCOntainer">
      <UserCard username={username} profileUrl={profileUrl} />
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          name="password"
          placeholder="Old password"
          onChange={(event) => setCpassword(event.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="New password"
          onChange={(event) => setNpassword(event.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Confirm new password"
          onChange={(event) => setCnpassword(event.target.value)}
        />
        {msg && (
          <div
            style={{
              color: 'red',
              padding: '5px 10%',
              marginBottom: '10px',
            }}
          >
            {msg}
          </div>
        )}
        {passResetSuccess && (
          <div
            style={{
              color: '#67df67',
              padding: '5px 10%',
              marginBottom: '10px',
            }}
          >
            {passResetSuccess}
          </div>
        )}
        <Input
          type="submit"
          name="submit"
          value="Change password"
          isButton
          disabled={
            !cpassword || !npassword || !cnpassword || npassword !== cnpassword
          }
        />
      </form>
    </div>
  );
};

export default ChangePassword;

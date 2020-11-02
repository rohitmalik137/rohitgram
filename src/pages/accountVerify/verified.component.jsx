import React, { useEffect } from 'react';

import './accountVerify.scss';
import { ReactComponent as Logo } from '../../assets/party_popper.c0c8accf.svg';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../../redux/actions/auth.actions';

const VerifiedPage = () => {
  const { token } = useParams();
  const errors = useSelector((state) => state.error.msg);
  const msg = errors && errors.msg;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUser({ token }));
  }, [dispatch, token]);
  const history = useHistory();
  return (
    <div className="verifyContainer">
      <Logo />
      {msg ? (
        <div className="error">{msg}</div>
      ) : (
        <>
          <h2>Account Email address confirmed</h2>
          <p>
            Congratulations, your account email address has been successfully
            confirmed!
          </p>
        </>
      )}
      <Button onClick={() => history.push('signup')} variant="primary">
        Start Exploring
      </Button>
    </div>
  );
};

export default VerifiedPage;

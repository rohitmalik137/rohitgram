import React from 'react';

import './accountVerify.scss';
import { ReactComponent as Logo } from '../../assets/party_popper.c0c8accf.svg';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VerificationSentPage = () => {
  const errors = useSelector((state) => state.error.msg);
  const msg = errors && errors.msg;
  const history = useHistory();
  return (
    <div className="verifyContainer">
      {msg ? (
        <div className="error">{msg}</div>
      ) : (
        <>
          <Logo />
          <h2>Verify Email address</h2>
          <p>
            A mail is sent to your email id. Please use that to verify your
            account.
          </p>
        </>
      )}
      <Button onClick={() => history.push('signup')} variant="primary">
        Use another Email address
      </Button>
    </div>
  );
};

export default VerificationSentPage;

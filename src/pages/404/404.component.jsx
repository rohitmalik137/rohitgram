import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <div style={{ textAlign: 'center', margin: '92px 10px' }}>
      <p style={{ fontSize: 'x-large', fontWeight: 'bold' }}>
        Sorry, this page isn't available.
      </p>
      <p>
        The link you followed may be broken, or the page may have been removed.
        <span
          onClick={() => history.push('/')}
          style={{ color: 'skyblue', cursor: 'pointer' }}
        >
          Go back to Rohitgram.
        </span>
      </p>
    </div>
  );
};

export default NotFoundPage;

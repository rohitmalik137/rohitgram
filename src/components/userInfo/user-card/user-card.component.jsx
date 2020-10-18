import React from 'react';
import { useHistory } from 'react-router-dom';

import './user-card.styles.scss';

const UserCard = ({
  username,
  profileUrl,
  chatCard,
  id,
  authUserId,
  chatHeader,
  authUser,
}) => {
  const history = useHistory();

  let domain = 'http://localhost:3000/';
  let mainUrl = domain + profileUrl;

  return (
    <div
      className="userCardCOntainer"
      onClick={() => {
        chatCard
          ? authUser > username
            ? history.push(`${authUserId}_${id}`)
            : history.push(`${id}_${authUserId}`)
          : history.push(`/${username}`);
      }}
    >
      {profileUrl ? (
        <img
          src={mainUrl}
          className={`${chatHeader ? 'chatHeader' : null}`}
          alt=""
        />
      ) : (
        <i
          className="fa fa-user-circle-o"
          aria-hidden="true"
          style={{
            cursor: 'pointer',
            marginLeft: '20px',
            fontSize: `${chatHeader ? '30px' : '56px'}`,
          }}
        ></i>
      )}
      <span style={{ marginLeft: '15px', fontSize: 'small' }}>
        <div style={{ fontWeight: 'bold' }}>{username}</div>
        <div>User Name</div>
      </span>
    </div>
  );
};

export default UserCard;

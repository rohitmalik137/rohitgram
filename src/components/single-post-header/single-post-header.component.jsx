import React from 'react';
import { useSelector } from 'react-redux';

import './single-post-header.styles.scss';

const SinglePostHeader = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="singlePostHeaderContainer">
      <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
      <div className="singlePostHeaderContainer--username">{user.username}</div>
      <i
        className="fa fa-bars"
        style={{ marginLeft: 'auto' }}
        aria-hidden="true"
      ></i>
    </div>
  );
};

export default SinglePostHeader;

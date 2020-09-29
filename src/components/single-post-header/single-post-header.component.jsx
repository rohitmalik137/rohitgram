import React from 'react';
import { Link } from 'react-router-dom';

import './single-post-header.styles.scss';

const SinglePostHeader = ({ username }) => {
  return (
    <div className="singlePostHeaderContainer">
      <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
      <Link to={`/${username}`} className="singlePostHeaderContainer--username">
        {username}
      </Link>
      <i
        className="fa fa-ellipsis-h"
        style={{ marginLeft: 'auto' }}
        aria-hidden="true"
      ></i>
    </div>
  );
};

export default SinglePostHeader;

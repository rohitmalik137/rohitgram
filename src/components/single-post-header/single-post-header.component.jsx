import React from 'react';
import { Link } from 'react-router-dom';

import './single-post-header.styles.scss';

const SinglePostHeader = ({ profileUrl, username }) => {
  let domain = 'http://localhost:3000/';
  let mainUrl = domain + profileUrl;

  return (
    <div className="singlePostHeaderContainer overall">
      <Link
        to={`/${username}`}
        className="singleCommentContainer--avatarContainer"
      >
        {profileUrl ? (
          <img
            src={mainUrl}
            className="singleCommentContainer--avatar"
            alt="avatar"
          />
        ) : (
          <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
        )}
      </Link>
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

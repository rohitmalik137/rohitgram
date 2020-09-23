import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './userinfo.styles.scss';

const UserInfo = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="userInfoContainer">
      {/* Profile Info Upper... Username...  Edit Button... Settings Icon */}
      <div className="userInfoContainer--section">
        <div className="userInfoContainer--username">{user.username}</div>
        <Link to="accounts/edit" className="userInfoContainer--edit">
          Edit Profile
        </Link>
        <div className="userInfoContainer--settings">
          <i className="fa fa-cog fa-2x" aria-hidden="true"></i>
        </div>
      </div>

      {/* Posts Followers Following */}
      <div className="userInfoContainer--section">
        <div className="userInfoContainer--section--inner">
          {user.posts} Posts{' '}
        </div>
        <div className="userInfoContainer--section--inner">
          {user.followers} Followers{' '}
        </div>
        <div className="userInfoContainer--section--inner">
          {user.following} Following
        </div>
      </div>

      {/* User Name  & Bio*/}
      <div className="userInfoContainer--lower">
        <div>User Name</div>
        <div>Bio</div>
      </div>
    </div>
  );
};

export default UserInfo;

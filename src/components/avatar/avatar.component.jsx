import React from 'react';

import userAvatar from '../../assets/user_-512.webp';
import './avatar.styles.scss';

const Avatar = () => (
  <div className="avatarContainer">
    <img src={userAvatar} alt="avatar" className="avatarImage" />
  </div>
);

export default Avatar;

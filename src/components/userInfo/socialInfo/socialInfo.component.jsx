import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './socialInfo.styles.scss';

const SocialInfo = () => {
  const userInformation = useSelector((state) => state.user.userInfo);

  const [showFollowers, setShowFollowers] = useState(false);
  const handleCloseFollowers = () => setShowFollowers(false);
  const handleShowFollowers = () => setShowFollowers(true);

  const [showFollowing, setShowFollowing] = useState(false);
  const handleCloseFollowing = () => setShowFollowing(false);
  const handleShowFollowing = () => setShowFollowing(true);

  return (
    <>
      <div className="userInfoContainer--section socialInfo--mobile">
        <div className="socialInfo--mobile-inner">
          <span>{userInformation ? userInformation.posts : 'loading'}</span>{' '}
          Posts{' '}
        </div>
        <div
          className="ml-3 socialInfo--mobile-inner"
          onClick={handleShowFollowers}
        >
          <span>
            {userInformation ? userInformation.followers.length : 'loading'}{' '}
          </span>
          Followers{' '}
        </div>
        <div
          className="ml-3 socialInfo--mobile-inner"
          onClick={handleShowFollowing}
        >
          <span>
            {userInformation ? userInformation.following.length : 'loading'}{' '}
          </span>
          Following
        </div>
      </div>

      <Modal
        show={showFollowers}
        onHide={handleCloseFollowers}
        centered
        size="sm"
        className="avatarContainer--body"
      >
        <Modal.Header closeButton>
          <Modal.Title>Followers</Modal.Title>
        </Modal.Header>
        {userInformation ? (
          userInformation.followers.length > 0 ? (
            userInformation.followers.map((follower) => {
              return (
                <Link
                  to={`/${follower}`}
                  onClick={handleCloseFollowers}
                  className="avatarContainer--header"
                >
                  {follower}
                </Link>
              );
            })
          ) : (
            <div className="avatarContainer--header">No Followers Yet!</div>
          )
        ) : null}
      </Modal>

      <Modal
        show={showFollowing}
        onHide={handleCloseFollowing}
        centered
        size="sm"
        className="avatarContainer--body"
      >
        <Modal.Header closeButton>
          <Modal.Title>Following</Modal.Title>
        </Modal.Header>
        {userInformation ? (
          userInformation.following.length > 0 ? (
            userInformation.following.map((following) => {
              return (
                <Link
                  to={`/${following}`}
                  onClick={handleCloseFollowing}
                  className="avatarContainer--header"
                >
                  {following}
                </Link>
              );
            })
          ) : (
            <div className="avatarContainer--header">No Following Yet!</div>
          )
        ) : null}
      </Modal>
    </>
  );
};

export default SocialInfo;

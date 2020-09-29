import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import './userinfo.styles.scss';
import { loadUser } from '../../redux/actions/auth.actions';
import { updateFollow, updateUnfollow } from '../../redux/actions/user.actions';

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userInformation = useSelector((state) => state.user.userInfo);
  const { username } = useParams();

  const [showFollowers, setShowFollowers] = useState(false);
  const handleCloseFollowers = () => setShowFollowers(false);
  const handleShowFollowers = () => setShowFollowers(true);

  const [showFollowing, setShowFollowing] = useState(false);
  const handleCloseFollowing = () => setShowFollowing(false);
  const handleShowFollowing = () => setShowFollowing(true);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const follow = () => {
    const body = {
      followedUser: userInformation.username,
    };
    dispatch(updateFollow(body));
    dispatch(loadUser());
  };

  const unfollow = () => {
    const body = {
      followedUser: userInformation.username,
    };
    dispatch(updateUnfollow(body));
    dispatch(loadUser());
  };

  return (
    <div className="userInfoContainer">
      {/* Profile Info Upper... Username...  Edit Button... Settings Icon */}
      <div className="userInfoContainer--section">
        <div className="userInfoContainer--username">
          {userInformation ? userInformation.username : 'loading'}
        </div>
        {user.following.includes(username) ? (
          <Button onClick={unfollow} className="btn btn-secondary pl-3 pr-3">
            Following
          </Button>
        ) : username === user.username ? (
          <Fragment>
            <Link to="accounts/edit" className="userInfoContainer--edit">
              Edit Profile
            </Link>
            <div className="userInfoContainer--settings">
              <i className="fa fa-cog fa-2x" aria-hidden="true"></i>
            </div>
          </Fragment>
        ) : (
          <Button onClick={follow} className="btn btn-primary pl-3 pr-3">
            Follow
          </Button>
        )}
      </div>

      {/* Posts Followers Following */}
      <div className="userInfoContainer--section">
        <div className="userInfoContainer--section--inner">
          {userInformation ? userInformation.posts : 'loading'} Posts{' '}
        </div>
        <div
          className="userInfoContainer--section--inner"
          onClick={handleShowFollowers}
        >
          {userInformation ? userInformation.followers.length : 'loading'}{' '}
          Followers{' '}
        </div>
        <div
          className="userInfoContainer--section--inner"
          onClick={handleShowFollowing}
        >
          {userInformation ? userInformation.following.length : 'loading'}{' '}
          Following
        </div>
      </div>

      {/* User Name  & Bio*/}
      <div className="userInfoContainer--lower">
        <div>User Name</div>
        <div>Bio</div>
      </div>

      <Modal
        show={showFollowers}
        onHide={handleCloseFollowers}
        centered
        size="sm"
        className="avatarContainer--body"
        closeButton
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
    </div>
  );
};

export default UserInfo;

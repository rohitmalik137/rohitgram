import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import './userinfo.styles.scss';
import { loadUser, logout } from '../../redux/actions/auth.actions';
import { updateFollow, updateUnfollow } from '../../redux/actions/user.actions';
import { toggleTheme } from '../../redux/actions/toggle.actions';

const UserInfo = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const authUser = user ? user.username : null;
  const userInformation = useSelector((state) => state.user.userInfo);
  const { username } = useParams();
  const isAUthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(loadUser());
    const updateDimensions = () => {
      let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
      setWindowWidth(windowWidth);
    };
    window.addEventListener('resize', updateDimensions);
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

  const renderView = (args) => {
    switch (args) {
      case 'smaller':
        return (
          <div className="userInfo--mobile">
            <div style={{ fontSize: 'x-large' }}>
              {userInformation ? userInformation.username : 'loading'}
              <span className="ml-3">
                {isAUthenticated ? (
                  username === user.username ? (
                    <i
                      className="fa fa-cog"
                      onClick={handleShow}
                      aria-hidden="true"
                    ></i>
                  ) : (
                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                  )
                ) : null}
              </span>
            </div>
            {userInformation ? (
              userInformation.followers.includes(authUser) ? (
                <Button onClick={unfollow} className="btn btn-secondary mr-3">
                  Following
                </Button>
              ) : isAUthenticated && username === user.username ? (
                <Fragment>
                  <Link to="accounts/edit" className="button">
                    Edit Profile
                  </Link>
                </Fragment>
              ) : (
                <Button
                  disabled={!isAUthenticated}
                  onClick={follow}
                  className="btn btn-primary mr-3"
                >
                  Follow
                </Button>
              )
            ) : null}
          </div>
        );
      case 'bigger':
      default:
        return (
          <div className="userInfoContainer--section">
            <div style={{ fontSize: 'larger' }}>
              {userInformation ? userInformation.username : 'loading'}
            </div>
            {userInformation && userInformation.followers.includes(authUser) ? (
              <Button
                onClick={unfollow}
                className="btn btn-secondary ml-3 pr-3"
              >
                Following
              </Button>
            ) : isAUthenticated && username === user.username ? (
              <Fragment>
                <Link to="accounts/edit" className="ml-3 button">
                  Edit Profile
                </Link>
                <div className="ml-3">
                  <i
                    className="fa fa-cog fa-2x"
                    onClick={handleShow}
                    aria-hidden="true"
                  ></i>
                </div>
              </Fragment>
            ) : (
              <Button
                disabled={!isAUthenticated}
                onClick={follow}
                className="btn btn-primary ml-3 pr-3"
              >
                Follow
              </Button>
            )}
          </div>
        );
    }
  };

  return (
    <>
      {windowWidth > 640 ? renderView('bigger') : renderView('smaller')}
      <Modal show={show} onHide={handleClose} centered className="userSettings">
        <div
          onClick={() => {
            history.push('/accounts/edit/password');
          }}
          className="userSettings--section hoverable"
        >
          Change Password
        </div>
        <div
          className="userSettings--section hoverable"
          onClick={() => dispatch(toggleTheme())}
        >
          Dark Theme/ Light Theme
        </div>
        <div
          onClick={() => dispatch(logout())}
          className="userSettings--section hoverable"
        >
          Log Out
        </div>
        <div onClick={handleClose} className="userSettings--section hoverable">
          {' '}
          Cancel
        </div>
      </Modal>
    </>
  );
};

export default UserInfo;

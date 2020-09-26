import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './userinfo.styles.scss';
import { loadUser } from '../../redux/actions/auth.actions';
import { updateFollow, updateUnfollow } from '../../redux/actions/user.actions';

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userInformation = useSelector((state) => state.usersList.userInfo);

  const { username } = useParams();
  console.log(username);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const follow = () => {
    const body = {
      followedUser: userInformation.username,
    };
    dispatch(updateFollow(body));
  };

  const unfollow = () => {
    const body = {
      followedUser: userInformation.username,
    };
    dispatch(updateUnfollow(body));
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
        <div className="userInfoContainer--section--inner">
          {userInformation ? userInformation.followers.length : 'loading'}{' '}
          Followers{' '}
        </div>
        <div className="userInfoContainer--section--inner">
          {userInformation ? userInformation.following.length : 'loading'}{' '}
          Following
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

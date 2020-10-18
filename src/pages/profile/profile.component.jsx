import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userPosts } from '../../redux/actions/post.actions';
import { userInfo } from '../../redux/actions/user.actions';
import Avatar from '../../components/avatar/avatar.component';
import UserInfo from '../../components/userInfo/userinfo.component';
import Posts from '../../components/posts/posts.component';
import SocialInfo from '../../components/userInfo/socialInfo/socialInfo.component';
import BioInfo from '../../components/userInfo/bioInfo/bioInfo.component';
import NotFoundPage from '../404/404.component';
import './profile.styles.scss';

const ProfilePage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const { username } = useParams();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(userPosts({ username }));
    dispatch(userInfo({ username }));
    let isMounted = true;
    const updateDimensions = () => {
      let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
      if (isMounted) setWindowWidth(windowWidth);
    };
    window.addEventListener('resize', updateDimensions);
    return () => {
      isMounted = false;
    };
  }, [dispatch, username]);

  const renderView = (args) => {
    switch (args) {
      case 'smaller':
        return (
          // Outer Container
          <div className="profilePageContainer">
            {/* Upper Container */}
            <div className="profilePageContainer--upper">
              <Avatar />
              <div className="profilePageContainer--upper-right">
                <UserInfo />
              </div>
            </div>
            <BioInfo />
            <hr className="overall" />
            <SocialInfo />
            <hr className="overall" />
            <Posts />
          </div>
        );
      case 'bigger':
      default:
        return (
          // Outer Container
          <div className="profilePageContainer">
            {/* Upper Container */}
            <div className="profilePageContainer--upper">
              <Avatar />
              <div className="profilePageContainer--upper-right">
                <UserInfo />
                <SocialInfo />
                <BioInfo />
              </div>
            </div>
            <hr className="overall" />
            <Posts />
          </div>
        );
    }
  };
  const isUserExists = users.filter((user) => user.username === username);
  return (
    <>
      {isUserExists.length > 0 ? (
        windowWidth > 640 ? (
          renderView('bigger')
        ) : (
          renderView('smaller')
        )
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default ProfilePage;

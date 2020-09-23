import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userPosts } from '../../redux/actions/post.actions';
import Avatar from '../../components/avatar/avatar.component';
import UserInfo from '../../components/userInfo/userinfo.component';
import Posts from '../../components/posts/posts.component';
import './profile.styles.scss';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  // console.log(match.params.username);
  useEffect(() => {
    dispatch(userPosts({ username }));
  }, [dispatch, username]);

  return (
    // Outer Container
    <div className="profilePageContainer">
      {/* Upper Container */}
      <div className="profilePageContainer--upper">
        <Avatar />
        <UserInfo />
      </div>
      <Posts />
    </div>
  );
};

export default ProfilePage;

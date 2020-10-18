import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Chat from '../../components/chat/chat.component';
import UserCard from '../../components/userInfo/user-card/user-card.component';

import './inbox.styles.scss';

const InboxPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const userList = useSelector((state) => state.user.users);
  const authUser = useSelector((state) => state.auth.user);
  const authUsername = authUser ? authUser.username : null;
  const authUserId = authUser ? authUser._id : null;

  useEffect(() => {
    let isMounted = true;
    const updateDimensions = () => {
      let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
      if (isMounted) setWindowWidth(windowWidth);
    };
    window.addEventListener('resize', updateDimensions);
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="inboxPageContainer">
      <div className="inboxPage-left">
        <div className="inboxPage-left__header">
          <span></span>
          <span>Direct</span>
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </div>
        {userList &&
          userList
            .filter((user) => user.username !== authUsername)
            .map((user) => {
              return (
                <>
                  <UserCard
                    username={user.username}
                    profileUrl={user.profileUrl}
                    chatCard="true"
                    key={user._id}
                    id={user._id}
                    authUserId={authUserId}
                    authUser={authUser.username}
                  />
                  <hr className="overall" />
                </>
              );
            })}
      </div>
      {windowWidth > 640 && <Chat />}
    </div>
  );
};

export default InboxPage;

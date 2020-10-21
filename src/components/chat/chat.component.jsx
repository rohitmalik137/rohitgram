import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserCard from '../userInfo/user-card/user-card.component';

import './chat.styles.scss';
import CustomInput from './customInput/customInput.component';
import Messages from './messages/messages.component';

const Chat = () => {
  const { chatId } = useParams();
  const chat = useSelector((state) => state.chat.chat);
  const userList = useSelector((state) => state.user.users);
  const authUser = useSelector((state) => state.auth.user);
  const authUsername = authUser ? authUser.username : null;
  const authUserId = authUser ? authUser._id : null;
  const id_array = chatId && chatId.split('_');

  const isBlocked =
    chat && chat.blocked.filter((user) => user === authUsername);

  const userWhoBlocked =
    chat && chat.blocked.filter((user) => user !== authUsername);

  let userTypingFor;

  const renderView = (args) => {
    switch (args) {
      case 'chat':
        return (
          <>
            <div className="chatContainer-header">
              {userList &&
                userList
                  .filter(
                    (user) =>
                      user._id ===
                      (id_array[1] === authUserId ? id_array[0] : id_array[1])
                  )
                  .map((user) => {
                    userTypingFor = user.username;
                    return (
                      <UserCard
                        username={user.username}
                        profileUrl={user.profileUrl}
                        key={user._id}
                        chatHeader="true"
                        otherUserIsBlocked={
                          userWhoBlocked && userWhoBlocked.length > 0
                            ? 'true'
                            : null
                        }
                      />
                    );
                  })}
            </div>
            <Messages />
            <div className="chatContainer-footer">
              {isBlocked && isBlocked.length > 0 ? (
                <p className="chatContainer-footer-blocked">
                  You can't reply to this conversation!!
                </p>
              ) : (
                <CustomInput userTypingFor={userTypingFor} />
              )}
            </div>
          </>
        );
      case 'empty':
      default:
        return (
          <div className="chatContainer-empty">
            <i
              className="fa fa-paper-plane-o fa-3x"
              style={{
                border: '2px solid rgb(204, 203, 203)',
                padding: '20px',
                marginBottom: '10px',
                borderRadius: '50%',
              }}
              aria-hidden="true"
            ></i>
            <h5>Your Messages</h5>
            <p style={{ fontSize: 'small' }}>
              Send private photos and messages to a friend or group.
            </p>
            <Button size="sm">Send Message</Button>
          </div>
        );
    }
  };
  return (
    <div className="chatContainer overall">
      {chatId ? renderView('chat') : renderView('empty')}
    </div>
  );
};

export default Chat;

import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';

import { getMessages } from '../../../redux/actions/chat.actions';
import Message from './message/message.component';
import './messages.styles.scss';

const Messages = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const [showMessageDetails, setShowMessageDetails] = useState(null);
  const chat = useSelector((state) => state.chat.chat);
  const authUser = useSelector((state) => state.auth.user);
  const authUsername = authUser ? authUser.username : null;

  const messageDetails = (id) => {
    setShowMessageDetails(id);
  };

  useEffect(() => {
    dispatch(getMessages({ chatId }));
  }, [dispatch, chatId]);
  return (
    <div className="messagesContainer">
      <ScrollToBottom className="scrollable-screen">
        {chat &&
          chat.messages.map((message) => {
            return (
              <div
                className={`${
                  authUsername === message.user ? 'sender' : 'receiver'
                } messagesContainer-message`}
                onMouseOver={() => messageDetails(message._id)}
                onMouseOut={() => setShowMessageDetails(false)}
              >
                {showMessageDetails && showMessageDetails === message._id && (
                  <span style={{ fontSize: 'x-small', pointerEvents: 'none' }}>
                    {authUsername === message.user &&
                      message.sentAt.toString().split(' GMT')[0]}
                  </span>
                )}
                <Message
                  key={message._id}
                  user={message.user}
                  message={message.message}
                  sentAt={message.sentAt}
                />
                {showMessageDetails && showMessageDetails === message._id && (
                  <span style={{ fontSize: 'x-small', pointerEvents: 'none' }}>
                    {authUsername !== message.user &&
                      message.sentAt.toString().split(' GMT')[0]}
                  </span>
                )}
              </div>
            );
          })}
      </ScrollToBottom>
    </div>
  );
};

export default Messages;

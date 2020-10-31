import React from 'react';
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
  const chat = useSelector((state) => state.chat.chat);
  const authUser = useSelector((state) => state.auth.user);
  const authUsername = authUser ? authUser.username : null;

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
              >
                <Message
                  key={message._id}
                  message={message.message}
                  sentAt={message.sentAt}
                  likes={message.likes}
                  currentUser={authUsername}
                  sender={authUsername === message.user ? 'sender' : 'receiver'}
                  msgId={message._id}
                />
              </div>
            );
          })}
      </ScrollToBottom>
    </div>
  );
};

export default Messages;

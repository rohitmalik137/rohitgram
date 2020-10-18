import React from 'react';

import './message.styles.scss';

const Message = ({ user, message, sentAt }) => {
  return <div className="messageContainer">{message}</div>;
};

export default Message;

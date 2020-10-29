import { Modal } from 'react-bootstrap';
import React, { useRef, useState } from 'react';

import './message.styles.scss';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { unsendUserMessage } from '../../../../redux/actions/chat.actions';

const Message = ({ user, message, sentAt, sender, msgId }) => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const msgTextCopy = useRef(null);
  const [showMessageDetails, setShowMessageDetails] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const unsendMessage = () => {
    dispatch(unsendUserMessage({ chatId, msgId }));
    handleClose();
  };

  const copyToClipBoard = () => {
    const selectedText = msgTextCopy.current.innerHTML;
    navigator.clipboard.writeText(selectedText);
    handleClose();
  };

  return (
    <>
      {sender === 'sender' && (
        <i
          onClick={handleShow}
          className="fa fa-ellipsis-h message-ellipsis"
          aria-hidden="true"
        ></i>
      )}
      {showMessageDetails && sender === 'sender' && (
        <span style={{ fontSize: 'x-small', pointerEvents: 'none' }}>
          {sentAt.toString().split(' GMT')[0]}
        </span>
      )}
      <div
        onMouseOver={() => setShowMessageDetails(true)}
        onMouseOut={() => setShowMessageDetails(false)}
        className="messageContainer"
        ref={msgTextCopy}
      >
        {message}
      </div>
      {showMessageDetails && sender === 'receiver' && (
        <span style={{ fontSize: 'x-small', pointerEvents: 'none' }}>
          {sentAt.toString().split(' GMT')[0]}
        </span>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="sm"
        className="avatarContainer--body"
      >
        <div onClick={unsendMessage} className="avatarContainer--remove">
          {' '}
          Unsend message
        </div>
        <div
          onClick={copyToClipBoard}
          style={{ cursor: 'copy' }}
          className="avatarContainer--header"
        >
          {' '}
          Copy text
        </div>
        <div onClick={handleClose} className="avatarContainer--cancel">
          {' '}
          Cancel
        </div>
      </Modal>
    </>
  );
};

export default Message;

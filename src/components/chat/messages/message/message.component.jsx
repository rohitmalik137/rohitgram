import { Modal } from 'react-bootstrap';
import React, { useRef, useState } from 'react';

import './message.styles.scss';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  toggleLikeSingleMessage,
  unsendUserMessage,
} from '../../../../redux/actions/chat.actions';

const Message = ({ currentUser, message, likes, sentAt, sender, msgId }) => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const msgTextCopy = useRef(null);
  const [showMessageDetails, setShowMessageDetails] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showLikesModal, setShowLikesModal] = useState(false);

  const handleCloseLikesModal = () => setShowLikesModal(false);
  const handleShowLikesModal = () => setShowLikesModal(true);

  const unsendMessage = () => {
    dispatch(unsendUserMessage({ chatId, msgId }));
    handleClose();
  };

  const copyToClipBoard = () => {
    const selectedText = msgTextCopy.current.innerHTML;
    navigator.clipboard.writeText(selectedText);
    handleClose();
  };
  const toggleLikeMessage = (e) => {
    dispatch(
      toggleLikeSingleMessage({ chatId, msgId, userWhoLiked: currentUser })
    );
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
        onDoubleClick={toggleLikeMessage}
        className="messageContainer"
      >
        <span ref={msgTextCopy}>{message}</span>
        {likes.length > 0 && (
          <span
            className="messageContainer-like"
            onClick={handleShowLikesModal}
          >
            <i
              style={{ color: 'red' }}
              className="fa fa-heart"
              aria-hidden="true"
            ></i>
          </span>
        )}
      </div>
      {showMessageDetails && sender === 'receiver' && (
        <span style={{ fontSize: 'x-small', pointerEvents: 'none' }}>
          {sentAt.toString().split(' GMT')[0]}
        </span>
      )}

      {/* Message Options Modal */}
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

      {/* Message Likes Modal */}
      <Modal
        show={showLikesModal}
        centered
        size="sm"
        onHide={handleCloseLikesModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Liked by</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {likes.map((user) => {
            return <p>{user}</p>;
          })}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Message;

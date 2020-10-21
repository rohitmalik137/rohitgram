import React, { createRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { blockSelectedUser } from '../../../redux/actions/chat.actions';

import './user-card.styles.scss';

const UserCard = ({
  username,
  profileUrl,
  chatCard,
  id,
  authUserId,
  chatHeader,
  authUser,
  otherUserIsBlocked,
}) => {
  const history = useHistory();
  const localVideoref = createRef();
  const remoteVideoref = createRef();
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const isTyping = useSelector((state) => state.chat.isTyping);
  const userWhoTyping = useSelector((state) => state.chat.userWhoTyping);
  const authUserr = useSelector((state) => state.auth.user);
  const authUsername = authUserr ? authUserr.username : null;
  const userTypingFor = useSelector((state) => state.chat.userTypingFor);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let domain = 'http://localhost:3000/';
  let mainUrl = domain + profileUrl;

  const success = (stream) => {
    localVideoref.current.srcObject = stream;
  };

  const failure = (e) => {
    console.log('Get user media error:', e);
  };

  const blockUser = () => {
    dispatch(blockSelectedUser({ username, chatId }));
    handleClose();
  };

  const openVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(success)
      .catch(failure);
  };

  return (
    <>
      <div
        className="userCardCOntainer"
        onClick={() => {
          return chatCard
            ? authUser > username
              ? history.push(`${authUserId}_${id}`)
              : history.push(`${id}_${authUserId}`)
            : null;
        }}
      >
        {profileUrl ? (
          <img
            src={mainUrl}
            className={`${chatHeader ? 'chatHeader' : null}`}
            onClick={() => {
              return !chatCard ? history.push(`/${username}`) : null;
            }}
            alt=""
          />
        ) : (
          <i
            className="fa fa-user-circle-o"
            aria-hidden="true"
            onClick={() => {
              return !chatCard ? history.push(`/${username}`) : null;
            }}
            style={{
              cursor: 'pointer',
              marginLeft: '20px',
              fontSize: `${chatHeader ? '30px' : '56px'}`,
            }}
          ></i>
        )}
        <span
          onClick={() => {
            return !chatCard ? history.push(`/${username}`) : null;
          }}
          style={{ marginLeft: '15px', fontSize: 'small' }}
        >
          <div style={{ fontWeight: 'bold' }}>{username}</div>
          {chatHeader ? (
            <span>
              {isTyping &&
              userWhoTyping === username &&
              userTypingFor === authUsername ? (
                <>{username} is typing...</>
              ) : (
                <div>User Name</div>
              )}
            </span>
          ) : (
            <div>User Name</div>
          )}
        </span>

        {/* chatHeader options */}
        {chatHeader && (
          <span style={{ marginLeft: 'auto' }}>
            <i
              onClick={openVideo}
              class="fa fa-video-camera chatHeader-icon"
              aria-hidden="true"
            ></i>
            <i class="fa fa-phone chatHeader-icon" aria-hidden="true"></i>
            <i
              onClick={handleShow}
              class="fa fa-ellipsis-v chatHeader-icon"
              aria-hidden="true"
            ></i>
          </span>
        )}
      </div>

      {/* Video Division */}
      {chatHeader && (
        <>
          <video className="videoPanel" ref={localVideoref} autoPlay></video>
          <video
            className="remotevideoPanel"
            ref={remoteVideoref}
            autoPlay
          ></video>
        </>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="sm"
        className="avatarContainer--body"
      >
        <div onClick={blockUser} className="avatarContainer--remove">
          {' '}
          {otherUserIsBlocked ? `Unblock ${username}` : `Block ${username}`}
        </div>
        <div onClick={handleClose} className="avatarContainer--cancel">
          {' '}
          Cancel
        </div>
      </Modal>
    </>
  );
};

export default UserCard;

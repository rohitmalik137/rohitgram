import React, { useState } from 'react';
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
  const { chatId } = useParams();

  // const localVideoref = createRef();
  // const remoteVideoref = createRef();
  // const textareaRef = createRef();

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

  const blockUser = () => {
    dispatch(blockSelectedUser({ username, chatId }));
    handleClose();
  };

  // //webRTC functions start
  // const success = (stream) => {
  //   localVideoref.current.srcObject = stream;
  // };

  // const failure = (e) => {
  //   console.log('Get user media error:', e);
  // };

  // const pc_config = null;

  // const pc = new RTCPeerConnection(pc_config);

  // pc.onicecandidate = (e) => {
  //   if (e.candidate) console.log(JSON.stringify(e.candidate));
  // };
  // pc.oniceconnectionstatechange = (e) => {
  //   console.log(e);
  // };
  // pc.ontrack = (e) => {
  //   console.log("i'm called");
  //   remoteVideoref.current.srcObject = e.stream;
  // };

  // const openVideo = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true })
  //     .then(success)
  //     .catch(failure);
  // };
  // const createOffer = () => {
  //   console.log('offer');
  //   pc.createOffer({ offerToReceiveVideo: 1 }).then(
  //     (sdp) => {
  //       console.log(JSON.stringify(sdp));
  //       pc.setLocalDescription(sdp);
  //     },
  //     (e) => {}
  //   );
  // };
  // const setRemoteDescription = () => {
  //   const desc = JSON.parse(textareaRef.current.value);
  //   pc.setRemoteDescription(new RTCSessionDescription(desc));
  // };
  // const createAnswer = () => {
  //   console.log('Answer');
  //   pc.createAnswer({ offerToReceiveVideo: 1 }).then(
  //     (sdp) => {
  //       console.log(JSON.stringify(sdp));
  //       pc.setLocalDescription(sdp);
  //     },
  //     (e) => {}
  //   );
  // };
  // const addCandidate = () => {
  //   const candidate = JSON.parse(textareaRef.current.value);
  //   console.log('Adding candidate: ', candidate);
  //   pc.addIceCandidate(new RTCIceCandidate(candidate));
  // };
  // //webRTC functions end

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
              // onClick={openVideo}
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
      {/* {chatHeader && (
        <>
          <video className="videoPanel" ref={localVideoref} autoPlay></video>
          <video
            className="remotevideoPanel"
            ref={remoteVideoref}
            autoPlay
          ></video>
          <button class="temparory" onClick={createOffer}>
            Offer
          </button>
          <button class="temparory" onClick={createAnswer}>
            Answer
          </button>
          <textarea class="temparory" ref={textareaRef} />
          <button class="temparory" onClick={setRemoteDescription}>
            Set Remote Desc
          </button>
          <button class="temparory" onClick={addCandidate}>
            Add candidate
          </button>
        </>
      )} */}

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

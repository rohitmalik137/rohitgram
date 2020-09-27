import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import userAvatar from '../../assets/user_-512.webp';
import './avatar.styles.scss';
import { updateProfile, userInfo } from '../../redux/actions/user.actions';

const Avatar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const dummyUrl = useSelector((state) => state.usersList.userInfo);
  const imgSrc = dummyUrl ? dummyUrl.profileUrl : null;
  const myUsername = user ? user.username : null;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { username } = useParams();

  useEffect(() => {
    dispatch(userInfo({ username }));
  }, [dispatch, username]);

  const getFile = () => {
    document.getElementById('fileInput').click();
  };

  const uploadSingleFile = (e) => {
    const formData = new FormData();
    formData.append('mediaUrl', e.target.files[0]);
    formData.append('username', user.username);
    dispatch(updateProfile({ formData }));
    setShow(false);
  };

  return (
    <>
      <div
        className="avatarContainer"
        onClick={username === myUsername ? handleShow : null}
      >
        <img
          src={imgSrc ? imgSrc : userAvatar}
          alt="avatar"
          className="avatarImage"
        />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="sm"
        className="avatarContainer--body"
      >
        <div className="avatarContainer--header">Change Profile Photo</div>
        <div className="avatarContainer--upload" onClick={getFile}>
          {' '}
          Upload Photo
        </div>
        <div className="avatarContainer--remove"> Remove Current Photo</div>
        <div onClick={handleClose} className="avatarContainer--cancel">
          {' '}
          Cancel
        </div>
        <form>
          <input
            type="file"
            name="file"
            id="fileInput"
            onChange={uploadSingleFile}
          />
        </form>
      </Modal>
    </>
  );
};

export default Avatar;

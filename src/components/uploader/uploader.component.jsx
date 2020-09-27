import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

import './uploader.styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '../input/input.component';
import { loadUser } from '../../redux/actions/auth.actions';
import { toggleUploader } from '../../redux/actions/toggle.actions';

const Uploader = () => {
  const dispatch = useDispatch();
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const show = useSelector((state) => state.toggle.toggleUploader);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, fileUrl]);

  const userId = user ? user._id : null;

  const backend_uri = 'http://localhost:7000';

  const uploadSingleFile = (e) => {
    setFileUrl(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const upload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('mediaUrl', file);
    formData.append('caption', caption);
    formData.append('likes', 0);
    formData.append('comments', []);
    formData.append('userId', userId);

    const headers = {
      'Content-type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    };
    axios
      .post(`${backend_uri}/newpost`, formData, { headers: headers })
      .then((res) => {
        console.log('post uploaded!!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFile = () => {
    document.getElementById('fileInput').click();
  };

  let imgPreview;
  if (fileUrl) {
    imgPreview = <img src={fileUrl} alt="" width="150" height="150" />;
  }
  return (
    // <div className="uploaderContainer">
    //   <div className="w-150 h-300 pl-5 pr-5 pt-2 m-auto bg-dark rounded"></div>
    <Modal
      show={show}
      centered
      onHide={() => dispatch(toggleUploader())}
      className="uploaderContainer w-40"
    >
      <form onSubmit={upload}>
        <Modal.Header>
          <Modal.Title className="m-auto">Upload your fav Pic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group preview">{imgPreview}</div>
          <div className="form-group">
            <div id="fileInputButton" onClick={getFile}>
              click to upload a file
            </div>
            <Input
              type="file"
              name="file"
              id="fileInput"
              placeholder="Add a file"
              onChange={uploadSingleFile}
            />
          </div>
          <textarea
            name="caption"
            className="uploaderContainer--textarea"
            onChange={(event) => setCaption(event.target.value)}
            placeholder="Add caption..."
          ></textarea>
          {/* <button type="submit" className="btn btn-primary btn-block">
                Upload
              </button> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch(toggleUploader())}
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => dispatch(toggleUploader())}
          >
            Upload
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Uploader;

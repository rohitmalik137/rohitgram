import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '../input/input.component';

const Uploader = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState(null);

  const userId = useSelector((state) => state.auth.user._id);

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
    formData.append('comments', 0);
    formData.append('userId', userId);

    console.log(formData.get('mediaUrl'));
    console.log(file, caption, 0, 0, userId);
    const headers = {
      'Content-type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    };
    axios
      .post(`${backend_uri}/newpost`, formData, { headers: headers })
      .then((res) => {
        console.log(res.data);
        alert('uploaded!');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let imgPreview;
  if (fileUrl) {
    imgPreview = <img src={fileUrl} alt="" width="150" height="150" />;
  }
  return (
    <div className="w-50 pl-5 pr-5 pt-2 m-auto bg-dark">
      <form onSubmit={upload}>
        <div className="form-group preview">{imgPreview}</div>
        <div className="form-group">
          <Input
            type="file"
            name="file"
            placeholder="Add a file"
            onChange={uploadSingleFile}
          />
        </div>
        <textarea
          name="caption"
          onChange={(event) => setCaption(event.target.value)}
          placeholder="Add caption..."
          cols="50"
        ></textarea>
        <button type="submit" className="btn btn-primary btn-block">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Uploader;

import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import './home.styles.scss';
import Uploader from '../../components/uploader/uploader.component';
import { toggleUploader } from '../../redux/actions/toggle.actions';

const HomePage = () => {
  const dispatch = useDispatch();

  // const [toggleUpload, setToggleUpload] = useState(false);
  return (
    <div>
      <Uploader />
      <h2>Home Page!</h2>
      <Button onClick={() => dispatch(toggleUploader())}>Upload!</Button>
    </div>
  );
};

export default HomePage;

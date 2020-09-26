import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import Uploader from '../../components/uploader/uploader.component';
import './home.styles.scss';

const HomePage = () => {
  const [toggleUpload, setToggleUpload] = useState(false);
  return (
    <div>
      {toggleUpload ? <Uploader /> : null}
      <h2>Home Page!</h2>
      <Button onClick={(event) => setToggleUpload(!toggleUpload)}>
        Upload!
      </Button>
    </div>
  );
};

export default HomePage;

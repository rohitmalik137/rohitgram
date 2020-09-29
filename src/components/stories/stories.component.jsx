import React from 'react';
import { useDispatch } from 'react-redux';

import './stories.styles.scss';
import { toggleUploader } from '../../redux/actions/toggle.actions';

const Stories = () => {
  const dispatch = useDispatch();
  return (
    <div className="storiesContainer">
      <i
        className="fa fa-user-circle-o fa-5x"
        aria-hidden="true"
        onClick={() => dispatch(toggleUploader())}
        style={{ cursor: 'pointer' }}
      ></i>
    </div>
  );
};

export default Stories;

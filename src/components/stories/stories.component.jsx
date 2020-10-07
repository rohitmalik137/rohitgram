import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './stories.styles.scss';
import { toggleUploader } from '../../redux/actions/toggle.actions';

const Stories = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const profileUrl = user ? user.profileUrl : null;
  const username = user ? user.username : null;

  return (
    <div className="storiesContainer">
      <div className="single-story" onClick={() => dispatch(toggleUploader())}>
        {profileUrl ? (
          <img src={profileUrl} alt="" />
        ) : (
          <i
            className="fa fa-user-circle-o fa-5x"
            aria-hidden="true"
            style={{ cursor: 'pointer' }}
          ></i>
        )}
        <div style={{ padding: '5px', margin: '0', height: '34px' }}>
          {username}
        </div>
        {/* <i class="fa fa-plus-circle plus-icon" aria-hidden="true"></i> */}
      </div>
    </div>
  );
};

export default Stories;

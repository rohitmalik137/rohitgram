import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ChangePassword from '../../components/edit/change-password/change-password.component';
import EditProfile from '../../components/edit/edit-profile/edit-profile.component';
import NotFoundPage from '../404/404.component';

import './edit.styles.scss';

const EditPage = () => {
  const { editoption } = useParams();
  const history = useHistory();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateDimensions = () => {
      let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
      setWindowWidth(windowWidth);
    };
    window.addEventListener('resize', updateDimensions);
  }, []);

  const renderView = (args) => {
    switch (args) {
      case 'password':
        return <ChangePassword />;
      case '404':
        return <NotFoundPage />;
      case 'edit':
      default:
        return <EditProfile />;
    }
  };

  return (
    <div className="editPageCOntainer">
      {windowWidth > 640 && (
        <div className="editPage-left overall">
          <p
            onClick={() => {
              history.push('/accounts/edit');
            }}
            className={`${
              editoption === undefined ? 'active ' : null
            } edit-left__options hoverable`}
          >
            Edit Profile
          </p>
          <p
            onClick={() => {
              history.push('/accounts/edit/password');
            }}
            className={`${
              editoption === 'password' ? 'active' : null
            } edit-left__options hoverable`}
          >
            Change Password
          </p>
        </div>
      )}
      <div className="editPage-right">
        {editoption === 'password'
          ? renderView('password')
          : editoption === undefined
          ? renderView('edit')
          : renderView('404')}
      </div>
    </div>
  );
};

export default EditPage;

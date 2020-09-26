import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toggleDropdown } from '../../redux/actions/toggle.actions';
import { logout } from '../../redux/actions/auth.actions';
import './profile-dropdown.styles.scss';

const ProfileDropdown = () => {
  const dispatch = useDispatch();

  const toggle = useSelector((state) => state.toggle.isHidden);

  // let history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const username = user ? user.username : null;
  // console.log(username);

  return (
    <div>
      {toggle ? (
        <div className="profile-dropdown">
          <Link
            to={`/${username}`}
            onClick={(event) => {
              dispatch(toggleDropdown());
              // history.push(`/${username}`);
            }}
            className="profile-dropdown__div"
          >
            Profile
          </Link>
          <div className="profile-dropdown__div">Saved</div>
          <div className="profile-dropdown__div">Settings</div>
          <hr />
          <div
            onClick={() => dispatch(logout())}
            className="profile-dropdown__div"
          >
            Log Out
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ProfileDropdown;

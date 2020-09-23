import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './profile-dropdown.styles.scss';

const ProfileDropdown = () => {
  const user = useSelector((state) => state.auth.user);
  const username = user ? user.username : null;
  // console.log(username);

  const [toggle, setToggle] = useState(true);
  return (
    <div>
      {toggle ? (
        <div className="profile-dropdown">
          <Link
            to={`${username}`}
            onClick={(event) => setToggle(!toggle)}
            className="profile-dropdown__div"
          >
            Profile
          </Link>
          <div className="profile-dropdown__div">Saved</div>
          <div className="profile-dropdown__div">Settings</div>
          <hr />
          <div className="profile-dropdown__div">Log Out</div>
        </div>
      ) : null}
    </div>
  );
};
export default ProfileDropdown;

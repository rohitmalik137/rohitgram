import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  toggleDropdown,
  hideDropdown,
} from '../../redux/actions/toggle.actions';
import { logout } from '../../redux/actions/auth.actions';
import './profile-dropdown.styles.scss';

function useOutsideAlerter(ref) {
  const dispatch = useDispatch();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(hideDropdown());
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, dispatch]);
}

const ProfileDropdown = () => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const dispatch = useDispatch();

  const toggle = useSelector((state) => state.toggle.isHidden);
  const user = useSelector((state) => state.auth.user);
  const username = user ? user.username : null;

  return (
    <div ref={wrapperRef}>
      {toggle ? (
        <div className="profile-dropdown">
          <Link
            to={`/${username}`}
            onClick={() => {
              dispatch(toggleDropdown());
              // history.push(`/${username}`);
            }}
            className="profile-dropdown__div"
          >
            <i
              className="fa fa-user-circle-o profile-dropdown--icon"
              aria-hidden="true"
            ></i>
            <span>Profile</span>
          </Link>
          <div className="profile-dropdown__div">
            <i
              className="fa fa-bookmark-o profile-dropdown--icon"
              aria-hidden="true"
            ></i>
            <span>Saved</span>
          </div>
          <div className="profile-dropdown__div">
            <i
              className="fa fa-cog profile-dropdown--icon"
              aria-hidden="true"
            ></i>
            <span>Settings</span>
          </div>
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

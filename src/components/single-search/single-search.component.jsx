import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './single-search.styles.scss';
import { toggleSearch } from '../../redux/actions/toggle.actions';

const SingleSearch = ({ username, profileUrl, searched }) => {
  const dispatch = useDispatch();
  const togglesearch = useSelector((state) => state.toggle.toggleSearch);
  return (
    <Fragment>
      {togglesearch ? (
        <Link
          to={`/${username}`}
          onClick={() => dispatch(toggleSearch())}
          style={{ textDecoration: 'none' }}
        >
          <div className="singleSearchContainer hoverable">
            {profileUrl ? (
              <img
                src={profileUrl}
                alt="userAvatar"
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  marginRight: '10px',
                }}
              />
            ) : (
              <i
                className="fa fa-user-circle-o singleSearchContainer--avatar"
                aria-hidden="true"
              ></i>
            )}
            <div>
              <div className="singleSearchContainer--username">{username}</div>
              User Name
            </div>
          </div>
        </Link>
      ) : null}
    </Fragment>
  );
};

export default SingleSearch;

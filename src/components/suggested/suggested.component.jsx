import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateFollow, usersList } from '../../redux/actions/user.actions';

import './suggested.styles.scss';

const Suggested = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userList = useSelector((state) => state.user.users);
  const profileUrl = user ? user.profileUrl : null;
  const username = user ? user.username : null;

  const follow = (followedUser) => {
    dispatch(updateFollow({ followedUser }));
    dispatch(usersList());
  };

  return (
    <div className="suggestedContainer">
      <div
        className="suggested--upper"
        onClick={() => history.push(`/${username}`)}
      >
        {profileUrl ? (
          <img src={profileUrl} style={{ marginLeft: '20px' }} alt="" />
        ) : (
          <i
            className="fa fa-user-circle-o"
            aria-hidden="true"
            style={{
              cursor: 'pointer',
              marginLeft: '20px',
              fontSize: '56px',
            }}
          ></i>
        )}
        <span style={{ marginLeft: '15px', fontSize: 'small' }}>
          <div style={{ fontWeight: 'bold' }}>{username}</div>
          <div>User Name</div>
        </span>
      </div>
      <div className="suggested--lower overall">
        <div className="suggested--lower_header">
          <p>Suggested For you</p>
          <p>See All</p>
        </div>
        {userList.length > 0
          ? userList
              .filter((data) => data.username !== user.username)
              .filter((data) => !user.following.includes(data.username))
              .map((user) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 'small',
                      margin: '0 10px 10px',
                      paddingBottom: '5px',
                      borderBottom: '1px solid #d6d6d6',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '10px',
                      }}
                    >
                      {user.profileUrl ? (
                        <img
                          src={user.profileUrl}
                          alt="avatar"
                          style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                          }}
                        />
                      ) : (
                        <i
                          className="fa fa-user-circle-o fa-3x singleSearchContainer--avatar"
                          aria-hidden="true"
                        ></i>
                      )}
                      <span style={{ marginLeft: '10px' }}>
                        <div
                          onClick={() => history.push(`/${user.username}`)}
                          style={{ fontWeight: 'bold', cursor: 'pointer' }}
                        >
                          {user.username}
                        </div>
                        <div>User Name</div>
                      </span>
                    </span>
                    <span
                      style={{ fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => follow(user.username)}
                    >
                      Follow
                    </span>
                  </div>
                );
              })
          : null}
      </div>
    </div>
  );
};

export default Suggested;

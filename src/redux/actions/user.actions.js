import axios from 'axios';
import { returnErrors } from './error.actions';
import {
  GET_USERS,
  USERS_LOADING,
  USERS_FETCHING_FAIL,
  USER_INFO_LOADING,
  GET_USER_INFO,
  USER_INFO_FETCHING_FAIL,
} from './types';

const backend_uri = 'http://localhost:7000';

export const usersList = () => (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  dispatch({ type: USERS_LOADING });

  axios
    .get(`${backend_uri}/usersList`, {}, config)
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: USERS_FETCHING_FAIL,
      });
    });
};

export const userInfo = ({ username }) => (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  dispatch({ type: USER_INFO_LOADING });
  // const body = JSON.stringify({ username });
  axios
    .get(`${backend_uri}/userInfo/${username}`, {}, config)
    .then((res) => {
      dispatch({
        type: GET_USER_INFO,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: USER_INFO_FETCHING_FAIL,
      });
    });
};

export const updateFollow = ({ followedUser }) => (dispatch, getState) => {
  //headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const username = getState().auth.user.username;
  console.log(username);
  const body = JSON.stringify({ username, followedUser });

  axios
    .patch(`${backend_uri}/follow`, body, config)
    .then((res) => {
      // console.log(res);
      // dispatch({
      //   type: REGISTER_SUCCESS,
      //   payload: res.data,
      // });
    })
    .catch((err) => {
      // dispatch(
      //   returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      // );
      // dispatch({
      //   type: REGISTER_FAIL,
      // });
    });
};

export const updateUnfollow = ({ followedUser }) => (dispatch, getState) => {
  //headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const username = getState().auth.user.username;
  console.log(username);
  const body = JSON.stringify({ username, followedUser });

  axios
    .patch(`${backend_uri}/unfollow`, body, config)
    .then((res) => {
      // console.log(res);
      // dispatch({
      //   type: REGISTER_SUCCESS,
      //   payload: res.data,
      // });
    })
    .catch((err) => {
      // dispatch(
      //   returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      // );
      // dispatch({
      //   type: REGISTER_FAIL,
      // });
    });
};

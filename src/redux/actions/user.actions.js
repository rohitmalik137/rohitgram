import axios from 'axios';
import { returnErrors } from './error.actions';
import { tokenConfig } from './auth.actions';
import {
  GET_USERS,
  USERS_LOADING,
  USERS_FETCHING_FAIL,
  USER_INFO_LOADING,
  GET_USER_INFO,
  USER_INFO_FETCHING_FAIL,
  PROFILE_LOADING,
  PROFILE_LOADED,
  PROFILE_LOADING_FAIL,
} from './types';

const backend_uri = 'http://localhost:7000';

const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const usersList = () => (dispatch) => {
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
  const username = getState().auth.user.username;
  console.log(username);
  const body = JSON.stringify({ username, followedUser });

  axios
    .patch(`${backend_uri}/follow`, body, config)
    .then((res) => {
      dispatch({
        type: PROFILE_LOADED,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'FOLLOW_FAIL')
      );
      dispatch({
        type: PROFILE_LOADING_FAIL,
      });
    });
};

export const updateUnfollow = ({ followedUser }) => (dispatch, getState) => {
  const username = getState().auth.user.username;
  console.log(username);
  const body = JSON.stringify({ username, followedUser });
  dispatch({ type: PROFILE_LOADING });

  axios
    .patch(`${backend_uri}/unfollow`, body, config)
    .then((res) => {
      dispatch({
        type: PROFILE_LOADED,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'UNFOLLOW_FAIL')
      );
      dispatch({
        type: PROFILE_LOADING_FAIL,
      });
    });
};

export const updateProfile = ({ formData }) => (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });

  axios
    .patch(`${backend_uri}/profile`, formData, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: PROFILE_LOADED,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'PROFILE_LOADING_FAIL'
        )
      );
      dispatch({
        type: PROFILE_LOADING_FAIL,
      });
    });
};

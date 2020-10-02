import axios from 'axios';
import { returnErrors } from './error.actions';
import {
  GET_POSTS,
  GET_ALL_POSTS,
  POSTS_LOADING,
  POSTS_FETCHING_FAIL,
  LIKE_TOGGLE_LOADING,
  LIKE_TOGGLE,
  LIKE_TOGGLE_ERROR,
  SINGLE_POST_LOADING,
  SINGLE_POST_LOADED,
  SINGLE_POST_FETCHING_FAIL,
  COMMENT_ERROR,
} from './types';
import { tokenConfig } from './auth.actions';

const backend_uri = 'http://localhost:7000';

const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const userPosts = ({ username }) => (dispatch) => {
  dispatch({ type: POSTS_LOADING });
  // const body = JSON.stringify({ username });
  axios
    .get(`${backend_uri}/userPosts/${username}`, {}, config)
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'POSTS_FETCHING_FAIL'
        )
      );
      dispatch({
        type: POSTS_FETCHING_FAIL,
      });
    });
};

export const allPosts = () => (dispatch) => {
  dispatch({ type: POSTS_LOADING });

  axios
    .get(`${backend_uri}/allPosts`, {}, config)
    .then((res) => {
      dispatch({
        type: GET_ALL_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'POSTS_FETCHING_FAIL'
        )
      );
      dispatch({
        type: POSTS_FETCHING_FAIL,
      });
    });
};

export const singlePost = ({ postId }) => (dispatch) => {
  dispatch({ type: SINGLE_POST_LOADING });

  axios
    .get(`${backend_uri}/singlePost/${postId}`, config)
    .then((res) => {
      console.log(res);
      dispatch({
        type: SINGLE_POST_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: SINGLE_POST_FETCHING_FAIL,
      });
    });
};

export const likeToggle = ({ postId }) => (dispatch, getState) => {
  dispatch({ type: LIKE_TOGGLE_LOADING });
  const username = getState().auth.user.username;
  const body = JSON.stringify({ username, postId });

  console.log(username, postId);

  axios
    .patch(`${backend_uri}/updateLikes`, body, tokenConfig(getState))
    .then((res) => {
      console.log(res);
      dispatch({
        type: LIKE_TOGGLE,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LIKE_TOGGLE_ERROR,
      });
    });
};

export const commentLikeToggle = ({ commentId }) => (dispatch, getState) => {
  dispatch({ type: LIKE_TOGGLE_LOADING });
  const username = getState().auth.user.username;
  const body = JSON.stringify({ username, commentId });

  // console.log(username, commentId);

  axios
    .patch(`${backend_uri}/likeCommentToggle`, body, tokenConfig(getState))
    .then((res) => {
      console.log(res);
      dispatch({
        type: LIKE_TOGGLE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LIKE_TOGGLE_ERROR,
      });
    });
};

export const addComment = ({ comment, postId }) => (dispatch, getState) => {
  const userId = getState().auth.user._id;
  const body = JSON.stringify({ userId, comment, postId });

  axios
    .patch(`${backend_uri}/addComment`, body, tokenConfig(getState))
    .then(() => {})
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: COMMENT_ERROR,
      });
    });
};

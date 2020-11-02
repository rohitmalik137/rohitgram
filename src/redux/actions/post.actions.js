import axios from 'axios';
import { returnErrors } from './error.actions';
import openSocket from 'socket.io-client';
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
  COMMENT_REPLIES_LOADING,
  COMMENT_REPLIES_ERROR,
  COMMENT_REPLIES_LOADED,
} from './types';
import { tokenConfig } from './auth.actions';

const backend_uri = process.env.REACT_APP_BACKEND_URL;

const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

const socket = openSocket(backend_uri);

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

  socket.on('userPosts', (data) => {
    if (data.action === 'getUserPosts') {
      dispatch({
        type: GET_POSTS,
        payload: data,
      });
    }
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
  socket.on('posts', (data) => {
    if (data.action === 'create') {
      dispatch({
        type: GET_ALL_POSTS,
        payload: data.post,
      });
    }
  });
};

export const singlePost = ({ postId }) => (dispatch) => {
  dispatch({ type: SINGLE_POST_LOADING });

  axios
    .get(`${backend_uri}/singlePost/${postId}`, config)
    .then((res) => {
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

  socket.on('likesUpdated', (data) => {
    if (data.action === 'updateLikes') {
      dispatch({
        type: SINGLE_POST_LOADED,
        payload: data,
      });
    }
  });

  socket.on('addComment', (data) => {
    if (data.action === 'commentAdded') {
      dispatch({
        type: SINGLE_POST_LOADED,
        payload: data,
      });
    }
  });

  socket.on('likeToggleComment', (data) => {
    if (data.action === 'likeToggleComment') {
      dispatch({
        type: SINGLE_POST_LOADED,
        payload: data,
      });
    }
  });
};

export const likeToggle = ({ postId }) => (dispatch, getState) => {
  dispatch({ type: LIKE_TOGGLE_LOADING });
  const username = getState().auth.user.username;
  const body = JSON.stringify({ username, postId });

  axios
    .patch(`${backend_uri}/updateLikes`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LIKE_TOGGLE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LIKE_TOGGLE_ERROR,
      });
    });
};

export const commentLikeToggle = ({ commentId, postId }) => (
  dispatch,
  getState
) => {
  dispatch({ type: LIKE_TOGGLE_LOADING });
  const username = getState().auth.user.username;
  const body = JSON.stringify({ username, commentId, postId });
  axios
    .patch(`${backend_uri}/likeCommentToggle`, body, tokenConfig(getState))
    .then()
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LIKE_TOGGLE_ERROR,
      });
    });
};

export const repliedCommentLikeToggle = ({ commentId, parentCommentId }) => (
  dispatch,
  getState
) => {
  dispatch({ type: LIKE_TOGGLE_LOADING });
  const username = getState().auth.user.username;
  const body = JSON.stringify({ username, commentId, parentCommentId });
  axios
    .patch(
      `${backend_uri}/likeRepliedCommentToggle`,
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: COMMENT_REPLIES_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LIKE_TOGGLE_ERROR,
      });
    });

  socket.on('likeToggleRepliedComment', (data) => {
    if (data.action === 'likeToggleRepliedComment') {
      dispatch({
        type: COMMENT_REPLIES_LOADED,
        payload: data.data,
      });
    }
  });
};

export const addComment = ({ comment, postId }) => (dispatch, getState) => {
  const userId = getState().auth.user._id;
  const body = JSON.stringify({ userId, comment, postId });

  axios
    .patch(`${backend_uri}/addComment`, body, tokenConfig(getState))
    .then(() => {})
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: COMMENT_ERROR,
      });
    });
};

export const fetchCommentReplies = ({ parentCommentId }) => (dispatch) => {
  dispatch({ type: COMMENT_REPLIES_LOADING });
  axios
    .get(`${backend_uri}/getCommentReplies/${parentCommentId}`, {}, config)
    .then((res) => {
      dispatch({
        type: COMMENT_REPLIES_LOADED,
        payload: res.data,
      });

      socket.on('repliedComment', (data) => {
        if (data.action === 'commentReplied') {
          dispatch({
            type: COMMENT_REPLIES_LOADED,
            payload: data.data,
          });
        }
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: COMMENT_REPLIES_ERROR,
      });
    });
};

export const replyComment = ({ comment, replyTo_commentId, repliedTo }) => (
  dispatch,
  getState
) => {
  const userId = getState().auth.user._id;
  const body = JSON.stringify({
    comment,
    replyTo_commentId,
    repliedTo,
    userId,
  });
  axios
    .patch(`${backend_uri}/replyComment`, body, tokenConfig(getState))
    .then()
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: COMMENT_ERROR,
      });
    });
};

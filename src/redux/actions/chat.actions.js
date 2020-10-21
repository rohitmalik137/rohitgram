import axios from 'axios';
import { returnErrors } from './error.actions';
import openSocket from 'socket.io-client';

import {
  SEND_MESSAGE_FAIL,
  FETCH_CHAT_FAIL,
  CHAT_MESSAGES,
  LOADING_CHAT,
  BLOCK_USER_FAIL,
  UNSEND_MESSAGE_FAIL,
  TYPING_TOGGLE,
} from './types';
import { tokenConfig } from './auth.actions';

const backend_uri = 'http://localhost:7000';
const socket = openSocket(backend_uri);

// Store Chat message to DB
export const sendMessage = ({ chatId, user, message }) => (
  dispatch,
  getState
) => {
  //Request Body
  const body = JSON.stringify({ chatId, user, message });
  axios
    .post(`${backend_uri}/postMessage`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CHAT_MESSAGES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'SEND_MESSAGE_FAIL'
        )
      );
      dispatch({
        type: SEND_MESSAGE_FAIL,
      });
    });

  socket.on('postMessage', (data) => {
    console.log(data);
    if (data.action === 'postMessage') {
      dispatch({
        type: CHAT_MESSAGES,
        payload: data.data,
      });
    }
  });
};

// Get messages of a particular chat
export const getMessages = ({ chatId }) => (dispatch, getState) => {
  dispatch({ type: LOADING_CHAT });

  axios
    .get(`${backend_uri}/getChat/${chatId}`, {}, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CHAT_MESSAGES,
        payload: res.data[0],
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'FETCH_CHAT_FAIL')
      );
      dispatch({
        type: FETCH_CHAT_FAIL,
      });
    });

  socket.on('getChat', (data) => {
    if (data.action === 'getChat') {
      dispatch({
        type: CHAT_MESSAGES,
        payload: data.data[0],
      });
    }
  });
  socket.on('postMessage', (data) => {
    if (data.action === 'postMessage') {
      dispatch({
        type: CHAT_MESSAGES,
        payload: data.data,
      });
    }
  });
  socket.on('isTyping', (data) => {
    if (data.action === 'isTyping') {
      console.log(data);
      dispatch({
        type: TYPING_TOGGLE,
        payload: data,
      });
    }
  });
};

export const blockSelectedUser = ({ username, chatId }) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ username, chatId });
  axios
    .patch(`${backend_uri}/blockUser`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CHAT_MESSAGES,
        payload: res.data[0],
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'BLOCK_USER_FAIL')
      );
      dispatch({
        type: BLOCK_USER_FAIL,
      });
    });

  socket.on('getChat', (data) => {
    if (data.action === 'getChat') {
      dispatch({
        type: CHAT_MESSAGES,
        payload: data.data[0],
      });
    }
  });
};

export const unsendUserMessage = ({ chatId, msgId }) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ chatId, msgId });
  axios
    .patch(`${backend_uri}/unsendMessage`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CHAT_MESSAGES,
        payload: res.data[0],
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'UNSEND_MESSAGE_FAIL'
        )
      );
      dispatch({
        type: UNSEND_MESSAGE_FAIL,
      });
    });

  socket.on('getChat', (data) => {
    if (data.action === 'getChat') {
      dispatch({
        type: CHAT_MESSAGES,
        payload: data.data[0],
      });
    }
  });
};

export const isTyping = (user, userTypingFor, isTyping) => (
  dispatch,
  getState
) => {
  // dispatch({ type: TYPING_TOGGLE, payload: isTyping });
  const body = JSON.stringify({ user, userTypingFor, isTyping });
  axios.post(`${backend_uri}/isTyping`, body, tokenConfig(getState));
};

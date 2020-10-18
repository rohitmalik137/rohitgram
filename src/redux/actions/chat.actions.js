import axios from 'axios';
import { returnErrors } from './error.actions';
import openSocket from 'socket.io-client';

import {
  SEND_MESSAGE_FAIL,
  FETCH_CHAT_FAIL,
  CHAT_MESSAGES,
  LOADING_CHAT,
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
    .get(`${backend_uri}/getChat/${chatId}`)
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
    console.log(data);
    if (data.action === 'getChat') {
      dispatch({
        type: CHAT_MESSAGES,
        payload: data.data[0],
      });
    }
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

import axios from 'axios';
import { returnErrors } from './error.actions';
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  POSTS_FETCHING_FAIL,
} from './types';

const backend_uri = 'http://localhost:7000';

export const userPosts = ({ username }) => (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

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
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: POSTS_FETCHING_FAIL,
      });
    });
};

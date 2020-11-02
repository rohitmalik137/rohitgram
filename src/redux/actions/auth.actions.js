import axios from 'axios';
import { returnErrors, clearErrors } from './error.actions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PASSWORD_RESET_SUCCESS,
} from './types';

const backend_uri = process.env.REACT_APP_BACKEND_URL;
console.log(process.env.REACT_APP_BACKEND_URL);

//headers
const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

//check token and load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_LOADING });

  axios
    .get(`${backend_uri}/auth/user`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
      dispatch(clearErrors());
    });
};

// Register User
export const register = ({ username, email, password }) => (dispatch) => {
  //Request Body
  const body = JSON.stringify({ username, email, password });
  axios
    .post(`${backend_uri}/auth/signup`, body, config)
    .then()
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login User
export const login = ({ uname_or_email, password }) => (dispatch) => {
  // Request body
  const body = JSON.stringify({ uname_or_email, password });

  axios
    .post(`${backend_uri}/auth/login`, body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const verifyUser = ({ token }) => (dispatch) => {
  axios
    .post(`${backend_uri}/auth/emailVerification/${token}`, {}, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
    });
};

export const verifyUserAfterAccountCreation = ({ mailForVerification }) => (
  dispatch
) => {
  dispatch(clearErrors());
  const body = JSON.stringify({ mailForVerification });
  axios
    .patch(`${backend_uri}/auth/verifyUserAfterAccountCreation`, body, config)
    .then((res) => {})
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getResetPassword = ({ mailForForgotPassword }) => (dispatch) => {
  dispatch(clearErrors());
  const body = JSON.stringify({ mailForForgotPassword });
  axios
    .patch(`${backend_uri}/auth/getEmailToResetPassword`, body, config)
    .then((res) => {})
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const postResetPassword = ({ email, otp, npassword }) => (dispatch) => {
  dispatch(clearErrors());
  const body = JSON.stringify({ email, otp, npassword });
  axios
    .patch(`${backend_uri}/auth/postResetPassword`, body, config)
    .then((res) => {
      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: res.data.msg,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const changePassword = ({
  username,
  cpassword,
  npassword,
  cnpassword,
}) => (dispatch, getState) => {
  dispatch(clearErrors());
  const body = JSON.stringify({ username, cpassword, npassword, cnpassword });
  axios
    .patch(`${backend_uri}/auth/changePassword`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: res.data.msg,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

//setup config/headers and token
export const tokenConfig = (getState) => {
  // get token from storage
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  //if token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

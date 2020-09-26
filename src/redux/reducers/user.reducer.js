import {
  GET_USERS,
  USERS_LOADING,
  USERS_FETCHING_FAIL,
  USER_INFO_LOADING,
  GET_USER_INFO,
  USER_INFO_FETCHING_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  users: [],
  userInfo: null,
  isLoading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      };
    case USERS_LOADING:
    case USER_INFO_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USERS_FETCHING_FAIL:
    case USER_INFO_FETCHING_FAIL:
      return {
        ...state,
        userPosts: [],
        userInfo: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;

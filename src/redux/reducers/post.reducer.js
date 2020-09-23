import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  POSTS_FETCHING_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  userPosts: null,
  isLoading: false,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        userPosts: action.payload,
        isLoading: false,
      };
    case POSTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case POSTS_FETCHING_FAIL:
      return {
        ...state,
        userPosts: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default postReducer;

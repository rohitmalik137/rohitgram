import {
  GET_ALL_POSTS,
  GET_POSTS,
  POSTS_LOADING,
  POSTS_FETCHING_FAIL,
  LIKE_TOGGLE_LOADING,
  LIKE_TOGGLE,
  LIKE_TOGGLE_ERROR,
  SINGLE_POST_LOADING,
  SINGLE_POST_LOADED,
  SINGLE_POST_FETCHING_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  userPosts: null,
  isLoading: false,
  singlePost: null,
  allPosts: null,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        userPosts: action.payload,
        isLoading: false,
      };
    case GET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      };
    case SINGLE_POST_LOADED:
    case LIKE_TOGGLE:
      return {
        ...state,
        singlePost: action.payload,
      };
    case POSTS_LOADING:
    case SINGLE_POST_LOADING:
    case LIKE_TOGGLE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case POSTS_FETCHING_FAIL:
    case LIKE_TOGGLE_ERROR:
    case SINGLE_POST_FETCHING_FAIL:
      return {
        ...state,
        userPosts: null,
        isLoading: false,
        singlePost: null,
        allPosts: null,
      };
    default:
      return state;
  }
};

export default postReducer;

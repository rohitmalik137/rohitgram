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
  COMMENT_ERROR,
  COMMENT_REPLIES_LOADING,
  COMMENT_REPLIES_ERROR,
  COMMENT_REPLIES_LOADED,
} from '../actions/types';

const INITIAL_STATE = {
  userPosts: null,
  isLoading: false,
  singlePost: null,
  commentReplies: null,
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
    case COMMENT_REPLIES_LOADED:
      return {
        ...state,
        commentReplies: action.payload,
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
    case COMMENT_REPLIES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case POSTS_FETCHING_FAIL:
    case LIKE_TOGGLE_ERROR:
    case SINGLE_POST_FETCHING_FAIL:
    case COMMENT_ERROR:
    case COMMENT_REPLIES_ERROR:
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

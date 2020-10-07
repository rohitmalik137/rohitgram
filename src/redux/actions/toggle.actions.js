import {
  TOGGLE,
  TOGGLE_SEARCH,
  TOGGLE_UPLOADER,
  HIDE_DROPDOWN,
  TOGGLE_COMMENT_REPLY_BOX,
  TOGGLE_COMMENT_REPLIES,
} from './types';

export const toggleDropdown = () => (dispatch) => {
  dispatch({ type: TOGGLE });
};

export const hideDropdown = () => (dispatch) => {
  dispatch({ type: HIDE_DROPDOWN });
};

export const toggleSearch = () => (dispatch) => {
  dispatch({ type: TOGGLE_SEARCH });
};

export const toggleUploader = () => (dispatch) => {
  dispatch({ type: TOGGLE_UPLOADER });
};

export const toggleCommentReplyBox = (commentId = null) => (dispatch) => {
  dispatch({ type: TOGGLE_COMMENT_REPLY_BOX, payload: commentId });
};

export const toggleCommentReplies = (commentId = null) => (dispatch) => {
  dispatch({ type: TOGGLE_COMMENT_REPLIES, payload: commentId });
};

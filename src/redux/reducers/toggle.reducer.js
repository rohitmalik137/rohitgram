import {
  TOGGLE,
  TOGGLE_SEARCH,
  TOGGLE_UPLOADER,
  HIDE_DROPDOWN,
  TOGGLE_COMMENT_REPLY_BOX,
  TOGGLE_COMMENT_REPLIES,
  TOGGLE_THEME,
} from '../actions/types';
const INITIAL_STATE = {
  isHidden: false,
  toggleSearch: false,
  toggleUploader: false,
  toggleCOmmentReply: false,
  toggleCOmmentReplyId: null,
  toggleCommentReplies: false,
  toggleCommentRepliesId: null,
  toggleTheme: window.localStorage.getItem('theme'),
};

const toggleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        isHidden: !state.isHidden,
      };
    case HIDE_DROPDOWN:
      return {
        ...state,
        isHidden: false,
      };
    case TOGGLE_SEARCH:
      return {
        ...state,
        toggleSearch: !state.toggleSearch,
      };
    case TOGGLE_UPLOADER:
      return {
        ...state,
        toggleUploader: !state.toggleUploader,
      };
    case TOGGLE_COMMENT_REPLY_BOX:
      return {
        ...state,
        toggleCOmmentReply: !state.toggleCOmmentReply,
        toggleCOmmentReplyId: action.payload,
      };
    case TOGGLE_COMMENT_REPLIES:
      return {
        ...state,
        toggleCommentReplies: !state.toggleCommentReplies,
        toggleCommentRepliesId: action.payload,
      };
    case TOGGLE_THEME:
      state.toggleTheme
        ? state.toggleTheme === 'light'
          ? window.localStorage.setItem('theme', 'dark')
          : window.localStorage.setItem('theme', 'light')
        : window.localStorage.setItem('theme', 'dark');
      return {
        ...state,
        toggleTheme: window.localStorage.getItem('theme'),
      };
    default:
      return state;
  }
};

export default toggleReducer;

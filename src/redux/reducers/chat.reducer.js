import {
  SEND_MESSAGE_FAIL,
  FETCH_CHAT_FAIL,
  CHAT_MESSAGES,
  LOADING_CHAT,
  BLOCK_USER_FAIL,
  UNSEND_MESSAGE_FAIL,
  TYPING_TOGGLE,
} from '../actions/types';
const INITIAL_STATE = {
  chat: null,
  isLoading: false,
  isTyping: false,
  userWhoTyping: null,
  userTypingFor: null,
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHAT_MESSAGES:
      return {
        ...state,
        chat: action.payload,
        isLoading: false,
      };
    case TYPING_TOGGLE:
      return {
        ...state,
        isTyping: action.payload.user.isTyping,
        userWhoTyping: action.payload.user.user,
        userTypingFor: action.payload.user.userTypingFor,
      };
    case LOADING_CHAT:
      return {
        ...state,
        isLoading: true,
      };
    case SEND_MESSAGE_FAIL:
    case FETCH_CHAT_FAIL:
    case UNSEND_MESSAGE_FAIL:
    case BLOCK_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        chat: [],
      };
    default:
      return state;
  }
};

export default chatReducer;

import {
  SEND_MESSAGE_FAIL,
  FETCH_CHAT_FAIL,
  CHAT_MESSAGES,
  LOADING_CHAT,
} from '../actions/types';
const INITIAL_STATE = {
  chat: null,
  isLoading: false,
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHAT_MESSAGES:
      return {
        ...state,
        chat: action.payload,
        isLoading: false,
      };
    case LOADING_CHAT:
      return {
        ...state,
        isLoading: true,
      };
    case SEND_MESSAGE_FAIL:
    case FETCH_CHAT_FAIL:
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

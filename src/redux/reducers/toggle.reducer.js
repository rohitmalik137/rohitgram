import { TOGGLE, TOGGLE_SEARCH, TOGGLE_UPLOADER } from '../actions/types';
const INITIAL_STATE = {
  isHidden: false,
  toggleSearch: false,
  toggleUploader: false,
};

const toggleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        isHidden: !state.isHidden,
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
    default:
      return state;
  }
};

export default toggleReducer;

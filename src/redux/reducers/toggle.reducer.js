import { TOGGLE, TOGGLE_SEARCH } from '../actions/types';
const INITIAL_STATE = {
  isHidden: false,
  toggleSearch: false,
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
    default:
      return state;
  }
};

export default toggleReducer;

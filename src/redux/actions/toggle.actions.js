import { TOGGLE, TOGGLE_SEARCH } from './types';

export const toggleDropdown = () => (dispatch) => {
  dispatch({ type: TOGGLE });
};

export const toggleSearch = () => (dispatch) => {
  dispatch({ type: TOGGLE_SEARCH });
};

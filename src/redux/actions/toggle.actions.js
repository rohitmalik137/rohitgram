import { TOGGLE, TOGGLE_SEARCH, TOGGLE_UPLOADER, HIDE_DROPDOWN } from './types';

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

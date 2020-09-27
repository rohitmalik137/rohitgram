import { TOGGLE, TOGGLE_SEARCH, TOGGLE_UPLOADER } from './types';

export const toggleDropdown = () => (dispatch) => {
  dispatch({ type: TOGGLE });
};

export const toggleSearch = () => (dispatch) => {
  dispatch({ type: TOGGLE_SEARCH });
};

export const toggleUploader = () => (dispatch) => {
  dispatch({ type: TOGGLE_UPLOADER });
};

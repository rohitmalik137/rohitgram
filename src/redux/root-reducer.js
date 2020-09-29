import { combineReducers } from 'redux';

import authReducer from './reducers/auth.reducer';
import errorReducer from './reducers/error.reducer';
import postReducer from './reducers/post.reducer';
import toggleReducer from './reducers/toggle.reducer';
import userReducer from './reducers/user.reducer';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['cart']
// }

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  post: postReducer,
  toggle: toggleReducer,
  user: userReducer,
});

// export default persistReducer(persistConfig, rootReducer);

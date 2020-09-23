import { combineReducers } from 'redux';

import authReducer from './reducers/auth.reducer';
import errorReducer from './reducers/error.reducer';
import postReducer from './reducers/post.reducer';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['cart']
// }

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  user: postReducer,
});

// export default persistReducer(persistConfig, rootReducer);

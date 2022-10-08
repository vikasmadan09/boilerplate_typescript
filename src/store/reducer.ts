import { combineReducers } from 'redux';
import userReducer from './slices/user.slice';

export default combineReducers({
  users: userReducer,
});

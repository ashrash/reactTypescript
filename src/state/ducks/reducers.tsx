import { combineReducers } from 'redux';
import { reducers as user } from './user';
import { reducers as hobby } from './hobby';

const rootReducer = combineReducers({
  user,
  hobby,
});

export default rootReducer;


import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import gameReducer from './game-reducer';
import chatReducer from './chat-reducer';

export default combineReducers({
  routing: routerReducer,
  game: gameReducer,
  chat: chatReducer
});


import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import gameReducer from './game-reducer';
import playerReducer from './player-reducer';
import chatReducer from './chat-reducer';
import notificationsReducer from './notifications-reducer';
import displayReducer from './display-reducer';

export default combineReducers({
  routing: routerReducer,
  game: gameReducer,
  chat: chatReducer,
  player: playerReducer,
  notifications: notificationsReducer,
  display: displayReducer,
});

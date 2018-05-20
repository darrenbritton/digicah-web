
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import gameReducer from './game-reducer';

export default combineReducers({
  routing: routerReducer,
  game: gameReducer,
});

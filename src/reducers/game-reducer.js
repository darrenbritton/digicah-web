import { SAVE_PLAYER } from '../actions';

export default function (state = { player: {} }, action) {
  switch (action.type) {
    case SAVE_PLAYER:
      return {
        ...state,
        player: action.payload,
      };
    default:
      return state;
  }
}

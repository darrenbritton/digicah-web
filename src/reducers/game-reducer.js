import { SAVE_PLAYER, SAVE_LOBBIES, SAVE_CARDPACKS } from '../actions';

export default function (state = { player: {}, lobbies: [], cardpacks: [] }, action) {
  switch (action.type) {
    case SAVE_PLAYER:
      return {
        ...state,
        player: action.payload,
      };
    case SAVE_LOBBIES:
      return {
        ...state,
        lobbies: action.payload,
      };
    case SAVE_CARDPACKS:
      return {
        ...state,
        cardpacks: action.payload,
      };
    default:
      return state;
  }
}

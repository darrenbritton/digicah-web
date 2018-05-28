import { SAVE_LOBBIES, SAVE_CARDPACKS, JOIN_GAME, NEW_ROUND, GAME_UPDATE } from '../actions';

export default function (state = { lobbies: [], cardpacks: [], playing: { currentRound: {}}}, action) {
  switch (action.type) {
    case SAVE_LOBBIES:
      return {
        ...state,
        lobbies: action.payload,
        playing: state.lobbies.find(lobby => lobby.id === action.payload.id) || state.playing
      };
    case SAVE_CARDPACKS:
      return {
        ...state,
        cardpacks: action.payload,
      };
    case JOIN_GAME:
      return {
        ...state,
        playing: state.lobbies.find(lobby => lobby.id === action.payload.id) || {},
      };
    case NEW_ROUND:
      return {
        ...state,
        playing: {
          ...state.playing,
          currentRound: action.payload
        },
      };
    case GAME_UPDATE:
      return {
        ...state,
        playing: action.payload
      };
    default:
      return state;
  }
}

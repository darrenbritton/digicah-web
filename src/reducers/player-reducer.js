import {SAVE_PLAYER, SAVE_LOBBIES, JOIN_GAME} from "../actions";

export default function (state = { session: {}, inGame: false }, action) {
  switch (action.type) {
    case SAVE_PLAYER:
      return {
        ...state,
        session: action.payload,
      };
    case JOIN_GAME:
      return {
        ...state,
        inGame: action.payload.inGame,
      };
    case SAVE_LOBBIES:
      return {
        ...state,
        inGame: state.session.id ? !!action.payload.find(lobby => lobby.players.find(player => player.id === state.session.id)) : false,
      };
    default:
      return state;
  }
}

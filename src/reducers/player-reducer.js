import {SAVE_PLAYER, SAVE_LOBBIES, JOIN_GAME, SAVE_HAND, GAME_UPDATE, RETURN_FROM_BREAK, PLAYER_SUBMIT, NEW_ROUND} from "../actions";

export default function (state = { session: {}, inGame: false, onBreak: false, hand: [], submittedTexts: [] }, action) {
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
    case SAVE_HAND:
      return {
        ...state,
        hand: action.payload
      };
    case SAVE_LOBBIES:
      return {
        ...state,
        inGame: state.session.id ? !!action.payload.find(lobby => lobby.players.find(player => player.id === state.session.id)) : false,
      };
    case GAME_UPDATE:
      if (action.payload.players && action.payload.players.find(player => player.id === state.session.id).onBreak === true) {
        return {
          ...state,
          onBreak: true
        }
      }
      return state;
    case RETURN_FROM_BREAK:
      return {
        ...state,
        onBreak: false
      };
    case PLAYER_SUBMIT:
      return {
        ...state,
        submittedTexts: [...state.submittedTexts, state.hand[action.payload.index].text]
      };
    case NEW_ROUND:
      return {
        ...state,
        submittedTexts: []
      };
    default:
      return state;
  }
}

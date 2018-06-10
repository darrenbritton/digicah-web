import { TOGGLE_PLAYER_DRAWER, TAKE_BREAK, RETURN_FROM_BREAK } from "../actions";

export default function (state = { playerDrawer: false, breakDrawer: false }, action) {
  switch (action.type) {
    case TOGGLE_PLAYER_DRAWER:
      return {
        ...state,
        playerDrawer: !state.playerDrawer,
      };
    case TAKE_BREAK:
      return {
        ...state,
        breakDrawer: true,
      };
    case RETURN_FROM_BREAK:
      return {
        ...state,
        breakDrawer: false,
      };
    default:
      return state;
  }
}

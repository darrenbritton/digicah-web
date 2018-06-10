import { primus } from '../store';

export const SAVE_PLAYER = 'save-player';
export const SAVE_LOBBIES = 'save-lobbies';
export const SAVE_CARDPACKS = 'save-cardpacks';
export const SAVE_HAND = 'save-hand';
export const CHAT_MESSAGE = 'chat-message';
export const CHAT_SEND = 'chat-send';
export const GAME_CREATE = 'game-create';
export const GAME_UPDATE = 'game-update';
export const NOTIFY_GENERIC = 'notify-generic';
export const NOTIFY_CLEAR = 'notify-clear';
export const JOIN_GAME = 'join-game';
export const TOGGLE_PLAYER_DRAWER = 'toggle-player-drawer';
export const TAKE_BREAK = 'take-break';
export const RETURN_FROM_BREAK = 'return-from-break';
export const NEW_ROUND = 'new-round';
export const PLAYER_SUBMIT = 'player-submit';
export const PLAYER_JUDGE = 'player-judge';
export const CZAR_JUDGE = 'czar-judge';
export const GAME_JUDGING = 'game-judging';

export const save = {
  player: payload => (dispatch) => {
    dispatch({
      type: SAVE_PLAYER,
      payload,
    });
  },
  lobbies: payload => (dispatch) => {
    dispatch({
      type: SAVE_LOBBIES,
      payload,
    });
  },
  cardpacks: payload => (dispatch) => {
    dispatch({
      type: SAVE_CARDPACKS,
      payload,
    });
  },
  hand: payload => (dispatch) => {
    dispatch({
      type: SAVE_HAND,
      payload,
    });
  },
};

export const chat = {
  message: payload => (dispatch) => {
    dispatch({
      type: CHAT_MESSAGE,
      payload,
    });
  },
  send: payload => (dispatch) => {
    primus.write({
      type: 'chat.message',
      payload,
    });
    dispatch({
      type: CHAT_SEND,
      payload,
    });
  },
};

export const game = {
  create: payload => (dispatch) => {
    primus.write({
      type: 'game.create',
      payload,
    });
    dispatch({
      type: GAME_CREATE,
      payload,
    });
  },
  update: payload => (dispatch) => {
    dispatch({
      type: GAME_UPDATE,
      payload,
    });
  },
  newRound: payload => (dispatch) => {
    dispatch({
      type: NEW_ROUND,
      payload,
    });
  },
  judging: payload => (dispatch) => {
    dispatch({
      type: GAME_JUDGING,
      payload,
    })
  },
};

export const notify = {
  generic: payload => (dispatch) => {
    dispatch({
      type: NOTIFY_GENERIC,
      payload,
    });
  },
  clear: payload => (dispatch) => {
    dispatch({
      type: NOTIFY_CLEAR,
      payload,
    });
  },
};

export const player = {
  joinGame: payload => (dispatch) => {
    primus.write({
      type: 'player.joinGame',
      payload,
    });
    dispatch({
      type: JOIN_GAME,
      payload: {...payload, inGame: true},
    });
  },
  submit: payload => (dispatch) => {
    primus.write({
      type: 'player.submit',
      payload,
    });
    dispatch({
      type: PLAYER_SUBMIT,
      payload: payload,
    });
  },
  judge: payload => (dispatch) => {
    primus.write({
      type: 'czar.judge',
      payload,
    });
    dispatch({
      type: PLAYER_JUDGE,
      payload,
    });
  },
  leaveGame: () => (dispatch) => {
    dispatch({
      type: JOIN_GAME,
      payload: {inGame: true},
    });
  },
  takeBreak: () => (dispatch) => {
    dispatch({
      type: TAKE_BREAK,
      payload: {},
    });
  },
  returnFromBreak: () => (dispatch) => {
    dispatch({
      type: RETURN_FROM_BREAK,
      payload: {},
    });
  },
};

export const czar = {
  judge: payload => (dispatch) => {
    dispatch({
      type: CZAR_JUDGE,
      payload
    });
  }
}

export const display = {
  togglePlayerDrawer: () => (dispatch) => {
    dispatch({
      type: TOGGLE_PLAYER_DRAWER,
      payload: {},
    });
  }
};

export default {
  save,
  chat,
  notify,
  player,
  czar,
  game
};

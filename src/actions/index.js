import { primus } from '../store';

export const SAVE_PLAYER = 'save-player';
export const SAVE_LOBBIES = 'save-lobbies';
export const SAVE_CARDPACKS = 'save-cardpacks';
export const CHAT_MESSAGE = 'chat-message';
export const CHAT_SEND = 'chat-send';
export const GAME_CREATE = 'game-create';

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
}

export default {
  save,
  chat
};

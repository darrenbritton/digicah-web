import { primus } from '../store';

export const SAVE_PLAYER = 'save-player';
export const CHAT_MESSAGE = 'chat-message';
export const CHAT_SEND = 'chat-send';

export const save = {
  player: payload => (dispatch) => {
    dispatch({
      type: SAVE_PLAYER,
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

export default {
  save,
  chat
};

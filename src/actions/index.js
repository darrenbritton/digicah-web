export const SAVE_PLAYER = 'save-player';

export const save = {
  player: payload => (dispatch) => {
    dispatch({
      type: SAVE_PLAYER,
      payload,
    });
  },
};

export default {
  save,
};

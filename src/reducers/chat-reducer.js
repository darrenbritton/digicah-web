import { CHAT_MESSAGE } from '../actions';

const getTime = function(timestamp) {
  const date = new Date(timestamp);
  return `${date.toLocaleTimeString()}`;
};


export default function (state = { chatlog: [] }, action) {
  switch (action.type) {
    case CHAT_MESSAGE:
      console.log(action);
      return {
        ...state,
        chatlog: [...state.chatlog, {
          author: 'them',
          sender: action.payload.id,
          type: 'text',
          data: {
            text: `${getTime(action.payload.timestamp)} - ${action.payload.nickname}: ${action.payload.message}`,
            raw: action.payload.message
          }
        }],
      };
    default:
      return state;
  }
}


import { ADD_DEVICE, REMOVE_DEVICE } from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case ADD_DEVICE:
      return [...state.filter(i => i.id !== action.device.id), action.device];
    case REMOVE_DEVICE:
      return state.filter(i => i.id !== action.id);
    default:
      return state;
  }
}


import { ADD_APPS, REMOVE_APPS } from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case ADD_APPS:
      return [
        { ...action.apps }, ...state.filter(i => i.host !== action.apps.host)
      ].sort((a, b) => a.id > b.id);
    case REMOVE_APPS:
      return state.filter(i => i.host !== action.host);
    default:
      return state;
  }
}

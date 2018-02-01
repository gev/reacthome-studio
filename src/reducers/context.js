// @flow

import { SET_PROJECT, SET_SECTION, SET_ITEM } from '../constants';
import type { Action, Context } from '../types';

export default function (state: Context = {}, { type, id }: Action): Context {
  switch (type) {
    case SET_PROJECT:
      return {
        ...state, project: id
      };
    case SET_SECTION:
      return {
        ...state, section: id
      };
    case SET_ITEM:
      return {
        ...state, item: id
      };
    default:
      return state;
  }
}

// @flow

import { PUT_TO_POOL } from '../constants';
import type { Action, Table } from '../types';

export default function (state: Table = {}, { type, pool }: Action): Table {
  switch (type) {
    case PUT_TO_POOL: return { ...state, ...pool };
    default: return state;
  }
}


import React from 'react';
import { Button } from '@rmwc/button';
import { OPERATOR, OPERATORS } from '../../../../constants';
import SelectMenu from '../../SelectMenu';

export default ({ code, title, onSelect }) => (
  <SelectMenu
    handle={<Button>{code || title || OPERATOR}</Button>}
    onSelect={onSelect}
    options={OPERATORS}
  />
);

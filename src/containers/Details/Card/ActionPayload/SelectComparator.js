
import React from 'react';
import { Button } from '@rmwc/button';
import { OPERATOR, COMPARATORS } from '../../../../constants';
import SelectMenu from '../../SelectMenu';

type Props = {
  code: ?string;
  title: ?string;
  onSelect: (id: string) => void;
};

export default ({ code, title, onSelect }: Props) => (
  <SelectMenu
    handle={<Button>{code || title || OPERATOR}</Button>}
    onSelect={onSelect}
    options={COMPARATORS}
  />
);

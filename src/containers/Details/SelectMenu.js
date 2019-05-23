
import React, { Component } from 'react';
import { SimpleMenu } from '@rmwc/menu';
import SelectMenuItem from './SelectMenuItem';

type Props = {
  options: [],
  handle: Component,
  onSelect: (id: string) => void
};

export default ({ handle, options, onSelect }: Props) => (
  <SimpleMenu handle={handle} style={{ minWidth: 200 }}>
    {
      options && options.map(i => (
        <SelectMenuItem key={i} id={i} onSelect={onSelect} />
      ))
    }
  </SimpleMenu>
);

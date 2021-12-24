
import React, { Component } from 'react';
import { SimpleMenu } from '@rmwc/menu';
import SelectMenuItem from './SelectMenuItem';

export default ({ handle, options = [], onSelect }) => (
  <SimpleMenu handle={handle} style={{ minWidth: 200 }}>
    {
      options.map(i => (
        <SelectMenuItem key={i} value={i} onSelect={onSelect} />
      ))
    }
  </SimpleMenu>
);


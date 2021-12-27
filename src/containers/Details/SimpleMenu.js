
import React, { Component } from 'react';
import { SimpleMenu } from '@rmwc/menu';
import Options from './Options';
import SelectMenuItem from '../../components/SelectMenuItem';

export default class extends Component{
  render() {
    const { handle, options, root, select, onSelect, onClose } = this.props;
    return (
      <SimpleMenu
        style={{ minWidth: 200 }}
        onClose={onClose}
        handle={handle}
        open
      >
        {
          Array.isArray(options) ? (
            options.map(i => (
              <SelectMenuItem key={i} value={i} onSelect={onSelect} />
            ))
          ) : (
              <Options root={root} select={select} onSelect={onSelect} />
          )
        }
      </SimpleMenu>
    );
  }
};

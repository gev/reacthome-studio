
import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import { EQUIPMENT_TYPE } from '../../constants';

type Props = {
  selected: string
};

export default class extends Component<Props> {
  render() {
    const { selected } = this.props;
    return (
      <thead>
        <tr>
          {
            EQUIPMENT_TYPE.map(i => (
              <th key={i}>
                <div className={`grid-cell ${i === selected ? 'grid-cell-hover' : 'grid-cell-header'}`}>
                  <Typography use="caption">{i}</Typography>
                </div>
              </th>
            ))
          }
        </tr>
      </thead>
    );
  }
}

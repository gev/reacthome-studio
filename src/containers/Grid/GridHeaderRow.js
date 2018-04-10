
import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import { EQUIPMENT_TYPE } from '../../constants';

export default class extends Component {
  render() {
    return (
      <thead>
        <tr>
          {
            EQUIPMENT_TYPE.map(i => (
              <th key={i}>
                <div className="grid-cell">
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

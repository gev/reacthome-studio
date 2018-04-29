
import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import { EQUIPMENT_TYPE } from '../../constants';
import style from './grid.css';

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
                <div className={`${style.gridCell} ${i === selected ? style.gridCellHover : style.gridCellHeader}`}>
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

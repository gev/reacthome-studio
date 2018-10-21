
import React, { Component } from 'react';
import { Typography } from '@rmwc/typography';
import { MODEL_TYPE } from '../../constants';
import styles from './grid.css';

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
            MODEL_TYPE.map(i => (
              <th key={i}>
                <div className={`${styles.gridCell} ${i === selected ? styles.gridCellHover : styles.gridCellHeader}`}>
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

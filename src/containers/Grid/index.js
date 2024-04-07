
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import GridBody from './GridBody';
import GridHeaderColumn from './GridHeaderColumn';
import GridHeaderRow from './GridHeaderRow';
import styles from './grid.css';

export default class extends Component {
  state = {};

  onSelect = (site, field) => () => {
    this.setState({ site, field });
  }

  render() {
    const { project } = this.props;
    const { site, field } = this.state;
    return (
      <div className={styles.grid}>
        <div className={styles.gridBody}>
          <table>
            <GridHeaderRow selected={field} />
            <tbody>
              <GridBody project={project} id={project} onSelect={this.onSelect} />
            </tbody>
          </table>
        </div>
        <div className={styles.gridColumn}>
          <table>
            <thead>
              <tr>
                <th>
                  <div className={`${styles.gridCell} ${styles.gridCellHeader}`}>
                    <Typography use="caption">site</Typography>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <GridHeaderColumn project={project} id={project} selected={site} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

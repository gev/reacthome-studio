
import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import GridHeaderColumn from './GridHeaderColumn';
import GridHeaderRow from './GridHeaderRow';
import GridBody from './GridBody';
import style from './grid.css';

type Props = {
  project: string
};

type State = {
  site: ?string,
  field: ?string
};

export default class extends Component<Props, State> {
  state = {};

  onSelect = (site, field) => () => {
    this.setState({ site, field });
  }

  render() {
    const { project } = this.props;
    const { site, field } = this.state;
    return (
      <div className={style.grid}>
        <div className={style.gridBody}>
          <table>
            <GridHeaderRow selected={field} />
            <tbody>
              <GridBody project={project} id={project} onSelect={this.onSelect} />
            </tbody>
          </table>
        </div>
        <div className={style.gridColumn}>
          <table>
            <thead>
              <tr>
                <th>
                  <div className={`${style.gridCell} ${style.gridCellHeader}`}>
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

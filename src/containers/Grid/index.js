
import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import GridHeaderColumn from './GridHeaderColumn';
import GridHeaderRow from './GridHeaderRow';
import GridBody from './GridBody';

type Props = {
  project: string
};

export default class extends Component<Props> {
  render() {
    const { project } = this.props;
    return (
      <div className="grid">
        <div className="grid-body">
          <table>
            <GridHeaderRow />
            <tbody>
              <GridBody project={project} id={project} />
            </tbody>
          </table>
        </div>
        <div className="grid-column">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="grid-cell">
                    <Typography use="caption">location</Typography>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <GridHeaderColumn project={project} id={project} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

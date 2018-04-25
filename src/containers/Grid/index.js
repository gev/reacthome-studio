
import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import GridHeaderColumn from './GridHeaderColumn';
import GridHeaderRow from './GridHeaderRow';
import GridBody from './GridBody';

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
      <div className="grid">
        <div className="grid-body">
          <table>
            <GridHeaderRow selected={field} />
            <tbody>
              <GridBody project={project} id={project} onSelect={this.onSelect} />
            </tbody>
          </table>
        </div>
        <div className="grid-column">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="grid-cell grid-cell-header">
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

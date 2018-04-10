
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Typography from 'rmwc/Typography';
import { LOCATION } from '../../constants';

type Props = {
  project: string,
  location: [],
  level: ?number,
  to: (location: string) => void
};

class GridHeaderColumn extends Component<Props> {
  to = (location) => () => {
    this.props.to(location);
  }

  render() {
    const { project, location, level = 0 } = this.props;
    return (
      location.map(l => [
        <tr key={l.id}>
          <td>
            <div
              className="grid-cell"
              style={{ textIndent: 24 * level }}
              onClick={this.to(l.id)}
            >
              <Typography use="caption">{l.title || l.id}</Typography>
            </div>
          </td>
        </tr>,
        <Row key={`sub-${l.id}`} id={l.id} level={level + 1} project={project} />
      ])
    );
  }
}

const Row = connect(
  ({ pool }, { id }) => ({
    location: ((pool[id] || {}).location || []).map(i =>
      ({ id: i, ...pool[i] }))
  }),
  (dispatch, { project }) => bindActionCreators({
    to: (location) => push(`/project/${project}/${location}/${LOCATION}`)
  }, dispatch)
)(GridHeaderColumn);

export default Row;

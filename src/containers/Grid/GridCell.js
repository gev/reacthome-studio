
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Typography from 'rmwc/Typography';

type Props = {
  id: string,
  count: number,
  field: string,
  to: (id: string, field: string) => void
};

class GridCell extends Component<Props> {
  to = (id, field) => () => {
    this.props.to(id, field);
  }

  render() {
    const { id, count, field } = this.props;
    return (
      <div className="grid-cell" onClick={this.to(id, field)}>
        <Typography use="caption">{count || ''}</Typography>
      </div>
    );
  }
}

const Row = connect(
  ({ pool }, { id, field }) => {
    const o = ((pool[id] || {})[field] || []);
    return {
      title: o.map(i => (pool[i] || {}).code || 'Untitled').join(' '),
      count: o.length
    };
  },
  (dispatch, { project }) => bindActionCreators({
    to: (location, field) => push(`/project/${project}/${location}/${field}`)
  }, dispatch)
)(GridCell);

export default Row;

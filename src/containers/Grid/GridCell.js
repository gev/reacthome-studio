
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Typography from 'rmwc/Typography';
import style from './grid.css';

type Props = {
  id: string,
  count: number,
  field: string,
  to: (id: string, field: string) => void
};

class GridCell extends Component<Props> {
  click = () => {
    const { id, field, to } = this.props;
    to(id, field);
  }

  render() {
    const { count } = this.props;
    return (
      <div className={style.gridCell} onClick={this.click}>
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
    to: (site, field) => push(`/project/${project}/${site}/${field}`)
  }, dispatch)
)(GridCell);

export default Row;

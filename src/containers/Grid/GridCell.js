
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Typography from '@rmwc/typography';
import styles from './grid.css';

type Props = {
  id: string,
  count: number,
  bind: number,
  field: string,
  to: (id: string, field: string) => void
};

class GridCell extends Component<Props> {
  click = () => {
    const { id, field, to } = this.props;
    to(id, field);
  }

  render() {
    const { count, bind } = this.props;
    const binded = bind === count;
    return (
      <div className={`${styles.gridCell} ${binded ? '' : styles.gridCellBind}`} onClick={this.click}>
        <Typography use="caption">{count || ''}</Typography>
      </div>
    );
  }
}

const Row = connect(
  ({ pool }, { id, field }) => {
    const o = ((pool[id] || {})[field] || []);
    return {
      count: o.length,
      bind: o.reduce((a, b) => a + (pool[b].bind ? 1 : 0), 0)
    };
  },
  (dispatch, { project }) => bindActionCreators({
    to: (site, field) => push(`/project/${project}/${site}/${field}`)
  }, dispatch)
)(GridCell);

export default Row;

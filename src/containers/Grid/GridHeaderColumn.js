/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Typography from '@rmwc/typography';
import styles from './grid.css';

class GridHeaderColumn extends Component {
  to = (site) => () => {
    this.props.to(site);
  }

  render() {
    const {
      id, title, code, project, site, level = 0, selected
    } = this.props;
    return [
      <tr key={id} className={level === 0 ? styles.level0 : ''}>
        <td className="paper">
          <div
            className={`${styles.gridCell} ${id === selected ? styles.gridCellHover : ''}`}
            style={{ textIndent: 24 * level }}
            onClick={this.to(id)}
          >
            <Typography use="caption">{[code, title].filter(Boolean).join(' / ') || id}</Typography>
          </div>
        </td>
      </tr>,
      (site || []).map(l => <Row key={`sub-${l}`} id={l} level={level + 1} project={project} selected={selected} />)
    ];
  }
}

const Row = connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { project }) => bindActionCreators({
    to: (site) => push(`/project/${project}/${site}`)
  }, dispatch)
)(GridHeaderColumn);

export default Row;

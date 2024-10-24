
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MODEL_TYPE } from '../../constants';
import GridCell from './GridCell';
import styles from './grid.css';


class GridBody extends Component {
  render() {
    const {
      id, site, project, level = 0, onSelect
    } = this.props;
    return [
      <tr key={id} className={level === 0 ? styles.level0 : ''}>
        {
          MODEL_TYPE.map(p => (
            <td key={p} onMouseEnter={onSelect(id, p)} onMouseLeave={onSelect()}>
              <GridCell id={id} field={p} project={project} />
            </td>
          ))
        }
      </tr>,
      (site || []).map(l => <Row key={`sub-${l}`} id={l} project={project} onSelect={onSelect} level={level + 1} />)
    ];
  }
}

const Row = connect(({ pool }, { id }) => pool[id] || {})(GridBody);

export default Row;

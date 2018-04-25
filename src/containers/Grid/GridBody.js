
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EQUIPMENT_TYPE } from '../../constants';
import GridCell from './GridCell';

type Props = {
  site: [],
  project: string,
  level: ?number,
  onSelect: (site: string, field: string) => void
};

class GridBody extends Component<Props> {
  render() {
    const {
      site = [], project, level = 0, onSelect
    } = this.props;
    return (
      site.map(l => [
        <tr key={l} className={level === 0 ? 'level-0' : ''}>
          {
            EQUIPMENT_TYPE.map(p => (
              <td key={p} onMouseEnter={onSelect(l, p)} onMouseLeave={onSelect()}>
                <GridCell id={l} field={p} project={project} />
              </td>
            ))
          }
        </tr>,
        <Row key={`sub-${l}`} id={l} project={project} onSelect={onSelect} level={level + 1} />
      ])
    );
  }
}

const Row = connect(({ pool }, { id }) => pool[id] || {})(GridBody);

export default Row;

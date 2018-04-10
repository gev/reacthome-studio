
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EQUIPMENT_TYPE } from '../../constants';
import GridCell from './GridCell';

type Props = {
  location: [],
  project: string
};

class GridBody extends Component<Props> {
  render() {
    const { location = [], project } = this.props;
    return (
      location.map(l => [
        <tr key={l}>
          {
            EQUIPMENT_TYPE.map(p => (
              <td key={p}>
                <GridCell id={l} field={p} project={project} />
              </td>
            ))
          }
        </tr>,
        <Row key={`sub-${l}`} id={l} project={project} />
      ])
    );
  }
}

const Row = connect(({ pool }, { id }) => pool[id] || {})(GridBody);

export default Row;

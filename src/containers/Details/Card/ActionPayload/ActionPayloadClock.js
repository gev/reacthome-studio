
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectClock from './SelectClock';

class Container extends Component {
  render() {
    const {
      id, project, payload = {}
    } = this.props;
    return (
      <div className="paper">
        <SelectClock action={id} payload={payload} project={project} />
      </div>
    );
  }
}

export default connect(({ pool }, { id }) => pool[id] || {})(Container);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onFalse, onTrue } from '../../../../constants';
import SelectScript from './SelectScript';

class Container extends Component {
  render() {
    const {
      id, project, payload = {}
    } = this.props;
    return (
      <div className="paper">
        <SelectScript action={id} payload={payload} project={project} field={onTrue} />
        <SelectScript action={id} payload={payload} project={project} field={onFalse} />
      </div>
    );
  }
}

export default connect(({ pool }, { id }) => pool[id] || {})(Container);

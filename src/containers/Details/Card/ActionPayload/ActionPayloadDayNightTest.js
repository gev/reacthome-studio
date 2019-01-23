
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectScript from './SelectScript';
import { onTrue, onFalse } from '../../../../constants';

type Props = {
  id: string;
  project: string;
  payload: ?{};
};

class Container extends Component<Props> {
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

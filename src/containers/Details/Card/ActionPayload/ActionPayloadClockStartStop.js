
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectClock from './SelectClock';

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
        <SelectClock action={id} payload={payload} project={project} />
      </div>
    );
  }
}

export default connect(({ pool }, { id }) => pool[id] || {})(Container);

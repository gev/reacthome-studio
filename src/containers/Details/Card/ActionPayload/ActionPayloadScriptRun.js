
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { set } from '../../../../actions';
import SelectScript from '../../SelectScript';

type Props = {
  project: string;
  payload: ?{};
  setScript: (id: string) => void;
};

class Container extends Component<Props> {
  render() {
    const {
      project, payload = {}, setScript
    } = this.props;
    return (
      <div className="paper">
        <SelectScript id={payload.id} project={project} onSelect={setScript} />
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id, payload }) => bindActionCreators({
    setScript: (script) => set(id, { payload: { ...payload, id: script } })
  }, dispatch)
)(Container);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField } from '@rmwc/textfield';
import SelectTimer from './SelectTimer';
import SelectScript from './SelectScript';
import { set } from '../../../../actions';

type Props = {
  id: string;
  project: string;
  payload: ?{};
  set: (time: number) => void;
};

class Container extends Component<Props> {
  onInput = (event) => {
    this.props.set(Number(event.target.value));
  };

  render() {
    const {
      id, project, payload = {}
    } = this.props;
    return (
      <div className="paper">
        <SelectTimer action={id} payload={payload} project={project} />
        <SelectScript action={id} payload={payload} project={project} />
        <TextField label="Time" type="number" value={payload.time || ''} onInput={this.onInput} />
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id, payload }) => bindActionCreators({
    set: (time) => set(id, { payload: { ...payload, time } })
  }, dispatch)
)(Container);

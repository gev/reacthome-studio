
import { TextField } from '@rmwc/textfield';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../../actions';
import SelectSchedule from './SelectSchedule';
import SelectScript from './SelectScript';

class Container extends Component {
  onInput = (event) => {
    this.props.modify(event.target.value);
  };

  render() {
    const {
      id, project, payload = {}
    } = this.props;
    return (
      <div className="paper">
        <SelectSchedule action={id} payload={payload} project={project} />
        <SelectScript action={id} payload={payload} project={project} />
        <TextField label="Schedule" value={payload.schedule || ''} onInput={this.onInput} />
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id, payload }) => bindActionCreators({
    modify: (schedule) => modify(id, { payload: { ...payload, schedule } })
  }, dispatch)
)(Container);

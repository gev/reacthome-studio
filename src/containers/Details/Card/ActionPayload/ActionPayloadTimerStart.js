
import { TextField } from '@rmwc/textfield';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../../actions';
import SelectScript from './SelectScript';
import SelectTimer from './SelectTimer';

class Container extends Component {
  onInput = (event) => {
    this.props.modify(Number(parseInt(event.target.value, 10)));
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
    modify: (time) => modify(id, { payload: { ...payload, time } })
  }, dispatch)
)(Container);

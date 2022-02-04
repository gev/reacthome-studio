
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField } from '@rmwc/textfield';
import SelectClock from './SelectClock';
import SelectScript from './SelectScript';
import { modify } from '../../../../actions';
import SelectComparator from './SelectComparator';
import { onTrue, onFalse } from '../../../../constants';


class Container extends Component {
  onInput = (event) => {
    this.props.modify(Number(parseInt(event.target.value, 10)));
  };

  render() {
    const {
      id, project, payload = {}, setOperator
    } = this.props;
    return (
      <div className="paper">
        <SelectClock action={id} payload={payload} project={project} />
        <SelectComparator code={payload.operator} onSelect={setOperator} />
        <SelectScript action={id} payload={payload} project={project} field={onTrue} />
        <SelectScript action={id} payload={payload} project={project} field={onFalse} />
        <TextField label="Time" type="number" value={payload.time || ''} onInput={this.onInput} />
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id, payload }) => bindActionCreators({
    setOperator: (operator) => modify(id, { payload: { ...payload, operator } }),
    modify: (time) => modify(id, { payload: { ...payload, time } })
  }, dispatch)
)(Container);


import { TextField } from '@rmwc/textfield';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../../actions';
import Autocomplete from '../../../Filter';
import SelectOperator from './SelectOperator';

class Container extends Component {
  onInput = (event) => {
    this.props.setValue(Number(event.target.value));
  };

  render() {
    const {
      payload = {}, setOperator, root, select
    } = this.props;
    return (
      <div className="paper">
        <Autocomplete id={payload.id} root={root} onSelect={select} />
        <table>
          <tbody>
            <tr>
              <td>
                <SelectOperator code={payload.operator} onSelect={setOperator} />
              </td>
              <td>
                <TextField value={payload.value || ''} onInput={this.onInput} type="number" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id, payload }) => bindActionCreators({
    setOperator: (operator) => modify(id, { payload: { ...payload, operator } }),
    setValue: (value) => modify(id, { payload: { ...payload, value } }),
    select: (target) => modify(id, { payload: { ...payload, id: target } })
  }, dispatch)
)(Container);

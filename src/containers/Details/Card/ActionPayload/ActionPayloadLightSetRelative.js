
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField } from '@rmwc/textfield';
import { set } from '../../../../actions';
import SelectLight from './SelectLight';
import SelectOperator from './SelectOperator';

type Props = {
  id: string;
  site: string;
  payload: ?{};
  setOperator: (id: string) => void;
  setValue: (value: number) => void;
};

class Container extends Component<Props> {
  onInput = (event) => {
    this.props.setValue(Number(event.target.value));
  };

  render() {
    const {
      id, site, payload, setOperator
    } = this.props;
    return (
      <div className="paper">
        <SelectLight root={site} action={id} payload={payload} />
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
    setOperator: (operator) => set(id, { payload: { ...payload, operator } }),
    setValue: (value) => set(id, { payload: { ...payload, value } })
  }, dispatch)
)(Container);


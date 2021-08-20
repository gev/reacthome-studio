
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Typography } from '@rmwc/typography';
import { Radio } from '@rmwc/radio';
import { ACTION_DI_RELAY_SYNC, DI } from '../../constants';
import { request } from '../../actions';

const Row = ({ index, onChange, sync = [] }) => {
  const Cell = ({ onAction, action }) => {
    const value = sync[onAction] || [];
    return (
      <td style={{ textAlign: 'center' }}>
        <Radio
          checked={value[index - 1] === action}
          onChange={() => {
            onChange(onAction, index, action);
          }}
        />
      </td>
    );
  };
  return (
    <tr>
      <td><Typography use="caption">{index}</Typography></td>
      <Cell onAction={1} action={0x01} />
      <Cell onAction={1} action={0x00} />
      <Cell onAction={1} action={0x02} />
      <Cell onAction={1} action={0xff} />
      <Cell onAction={0} action={0x01} />
      <Cell onAction={0} action={0x00} />
      <Cell onAction={0} action={0x02} />
      <Cell onAction={0} action={0xff} />
    </tr>
  );
};

class Container extends Component {
  change = (onAction, index, action) => {
    const { relay } = this.props;
    const state = Array(relay).fill(0xff);
    const { sync = [state, state], set } = this.props;
    const value = [[...sync[0]], [...sync[1]]];
    value[onAction][index - 1] = action;
    console.log(index, value);
    set(value);
  };

  render() {
    const { sync, relay } = this.props;
    return (
      <div className="paper">
        <table>
          <thead>
            <tr>
              <th />
              <th colSpan="3"><Typography use="caption">On</Typography></th>
              <th colSpan="3"><Typography use="caption">Off</Typography></th>
            </tr>
            <tr>
              <th />
              <th><Typography use="caption">On</Typography></th>
              <th><Typography use="caption">Off</Typography></th>
              <th><Typography use="caption">Not</Typography></th>
              <th><Typography use="caption">_</Typography></th>
              <th><Typography use="caption">On</Typography></th>
              <th><Typography use="caption">Off</Typography></th>
              <th><Typography use="caption">Not</Typography></th>
              <th><Typography use="caption">_</Typography></th>
            </tr>
          </thead>
          <tbody>
            {
              Array(relay).fill(0).map((_, i) => (
                <Row index={i + 1} onChange={this.change} sync={sync} />
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id, index }) => pool[`${id}/${DI}/${index}`] || {},
  (dispatch, { id, index, daemon }) => bindActionCreators({
    set: (value) => request(daemon, {
      type: ACTION_DI_RELAY_SYNC, id, index, value
    })
  }, dispatch)
)(Container);

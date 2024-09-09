
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../../actions';
import {
  HYSTERESIS,
  START_HEAT,
  STOP_HEAT,
  onStartHeat,
  onStopHeat
} from '../../../../constants';
import SelectScript from '../../SelectScript';
import SelectHeater from './SelectHeater';

class Container extends Component {
  set = (key) => (event) => {
    this.props.set(key, event.target.value);
  };

  on = (on) => (id) => {
    this.props.on(on, id);
  };

  render() {
    const {
      id, project, payload = {}
    } = this.props;
    return (
      <div className="paper">
        <SelectHeater action={id} payload={payload} project={project} root={project} />
        <TextField label={HYSTERESIS} value={payload[HYSTERESIS] || ''} onInput={this.set(HYSTERESIS)} />
        <table>
          <tbody>
            <tr>
              <td>
                <Typography use="caption">{START_HEAT}</Typography>
              </td>
              <td>
                <SelectScript
                  id={payload.onStartHeat}
                  project={project}
                  onSelect={this.on(onStartHeat)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Typography use="caption">{STOP_HEAT}</Typography>
              </td>
              <td>
                <SelectScript
                  id={payload.onStopHeat}
                  project={project}
                  onSelect={this.on(onStopHeat)}
                />
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
    set: (key, value) => modify(id, { payload: { ...payload, [key]: value } }),
    on: (on, script) => modify(id, { payload: { ...payload, [on]: script } })
  }, dispatch)
)(Container);

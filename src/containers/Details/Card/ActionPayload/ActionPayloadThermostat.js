
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../../actions';
import {
  COOL_HYSTERESIS,
  COOL_THRESHOLD,
  HEAT_HYSTERESIS,
  HEAT_THRESHOLD,
  START_COOL,
  START_HEAT,
  STOP_COOL,
  STOP_HEAT,
  onStartCool,
  onStartHeat,
  onStopCool,
  onStopHeat
} from '../../../../constants';
import SelectScript from '../../SelectScript';
import SelectThermostat from './SelectThermostat';

class Container extends Component {
  set = (key) => (event) => {
    this.props.set(key, event.target.value);
  };

  on = (on) => (id) => {
    this.props.on(on, id);
  };

  remove = (on) => () => {
    this.props.on(on, null);
  };

  render() {
    const {
      id, project, payload = {}
    } = this.props;
    return (
      <div>
        <div className="paper">
          <SelectThermostat action={id} payload={payload} project={project} root={project} />
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <TextField label={COOL_HYSTERESIS} value={payload[COOL_HYSTERESIS] || ''} onInput={this.set(COOL_HYSTERESIS)} />
              </td>
              <td className="paper">
                <TextField label={COOL_THRESHOLD} value={payload[COOL_THRESHOLD] || ''} onInput={this.set(COOL_THRESHOLD)} />
              </td>
            </tr>
            <tr>
              <td className="paper">
                <TextField label={HEAT_HYSTERESIS} value={payload[HEAT_HYSTERESIS] || ''} onInput={this.set(HEAT_HYSTERESIS)} />
              </td>
              <td>
                <TextField label={HEAT_THRESHOLD} value={payload[HEAT_THRESHOLD] || ''} onInput={this.set(HEAT_THRESHOLD)} />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td className="paper">
                <Typography use="caption">{START_COOL}</Typography>
              </td>
              <td className="paper">
                <SelectScript
                  id={payload.onStartCool}
                  project={project}
                  onSelect={this.on(onStartCool)}
                />
              </td>
              <td className="paper">
                {
                  payload.onStartCool && (
                    <Typography use="caption" onClick={this.remove(onStartCool)}><strong> X </strong></Typography>
                  )
                }
              </td>
            </tr>
            <tr>
              <td className="paper">
                <Typography use="caption">{STOP_COOL}</Typography>
              </td>
              <td className="paper">
                <SelectScript
                  id={payload.onStopCool}
                  project={project}
                  onSelect={this.on(onStopCool)}
                />
              </td>
              <td className="paper">
                {
                  payload.onStopCool && (
                    <Typography use="caption" onClick={this.remove(onStopCool)}><strong> X </strong></Typography>
                  )
                }
              </td>
            </tr>
            <tr>
              <td className="paper">
                <Typography use="caption">{START_HEAT}</Typography>
              </td>
              <td className="paper">
                <SelectScript
                  id={payload.onStartHeat}
                  project={project}
                  onSelect={this.on(onStartHeat)}
                />
              </td>
              <td className="paper">
                {
                  payload.onStartHeat && (
                    <Typography use="caption" onClick={this.remove(onStartHeat)}><strong> X </strong></Typography>
                  )
                }
              </td>
            </tr>
            <tr>
              <td>
                <Typography use="caption">{STOP_HEAT}</Typography>
              </td>
              <td className="paper">
                <SelectScript
                  id={payload.onStopHeat}
                  project={project}
                  onSelect={this.on(onStopHeat)}
                />
              </td>
              <td className="paper">
                {
                  payload.onStopHeat && (
                    <Typography use="caption" onClick={this.remove(onStopHeat)}><strong> X </strong></Typography>
                  )
                }
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


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { modify } from '../../../../actions';
import SelectScript from '../../SelectScript';
import SelectSite from './SelectSite';
import SelectSensor from './SelectSensor';
import { COOL_HYSTERESIS, COOL_THRESHOLD, HEAT_HYSTERESIS, HEAT_THRESHOLD, COOL, onCool, STOP, onStop, HEAT, onHeat, SITE, SENSOR } from '../../../../constants';
import SelectThermostat from './SelectThermostat';

type Props = {
  id: string;
  project: string;
  payload: ?{};
  set: (key: string, value: number) => void;
  on: (on: string, id: string) => void;
};

class Container extends Component<Props> {
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
        <SelectThermostat action={id} payload={payload} project={project} root={project} />
        <table>
          <tbody>
            <tr>
              <td>
                <TextField label={COOL_HYSTERESIS} value={payload[COOL_HYSTERESIS] || ''} onInput={this.set(COOL_HYSTERESIS)} />
              </td>
              <td>
                <TextField label={COOL_THRESHOLD} value={payload[COOL_THRESHOLD] || ''} onInput={this.set(COOL_THRESHOLD)} />
              </td>
            </tr>
            <tr>
              <td>
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
              <td>
                <Typography use="caption">{COOL}</Typography>
              </td>
              <td>
                <Typography use="caption">{STOP}</Typography>
              </td>
              <td>
                <Typography use="caption">{HEAT}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <SelectScript
                  id={payload.onCool}
                  project={project}
                  onSelect={this.on(onCool)}
                />
              </td>
              <td>
                <SelectScript
                  id={payload.onStop}
                  project={project}
                  onSelect={this.on(onStop)}
                />
              </td>
              <td>
                <SelectScript
                  id={payload.onHeat}
                  project={project}
                  onSelect={this.on(onHeat)}
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

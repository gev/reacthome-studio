
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../../actions';
import { HYSTERESIS, START_VENTILATION, STOP_VENTILATION, onStartVentilation, onStopVentilation } from '../../../../constants';
import SelectScript from '../../SelectScript';
import SelectCO2stat from './SelectCO2stat';

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
          <SelectCO2stat action={id} payload={payload} project={project} root={project} />
        </div>
        <div className="paper">
          <TextField label={HYSTERESIS} value={payload[HYSTERESIS] || ''} onInput={this.set(HYSTERESIS)} />
        </div>
        <table>
          <tbody>
            <tr>
              <td className="paper">
                <Typography use="caption">{START_VENTILATION}</Typography>
              </td>
              <td className="paper">
                <SelectScript
                  id={payload.onStartVentilation}
                  project={project}
                  onSelect={this.on(onStartVentilation)}
                />
              </td>
              <td className="paper">
                {
                  payload.onStartVentilation && (
                    <Typography use="caption" onClick={this.remove(onStartVentilation)}><strong> X </strong></Typography>
                  )
                }
              </td>
            </tr>
            <tr>
              <td className="paper">
                <Typography use="caption">{STOP_VENTILATION}</Typography>
              </td>
              <td className="paper">
                <SelectScript
                  id={payload.onStopVentilation}
                  project={project}
                  onSelect={this.on(onStopVentilation)}
                />
              </td>
              <td className="paper">
                {
                  payload.onStopVentilation && (
                    <Typography use="caption" onClick={this.remove(onStopVentilation)}><strong> X </strong></Typography>
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


import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../../actions';
import {
  DRY_HYSTERESIS,
  DRY_THRESHOLD,
  START_DRY,
  START_WET,
  STOP_DRY,
  STOP_WET,
  WET_HYSTERESIS,
  WET_THRESHOLD,
  onStartDry,
  onStartWet,
  onStopDry,
  onStopWet
} from '../../../../constants';
import SelectScript from '../../SelectScript';
import SelectHygrostat from './SelectHygrostat';

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
          <SelectHygrostat action={id} payload={payload} project={project} root={project} />
        </div>
        <table>
          <tbody>
            <tr>
              <td className="paper">
                <TextField label={DRY_HYSTERESIS} value={payload[DRY_HYSTERESIS] || ''} onInput={this.set(DRY_HYSTERESIS)} />
              </td>
              <td className="paper">
                <TextField label={DRY_THRESHOLD} value={payload[DRY_THRESHOLD] || ''} onInput={this.set(DRY_THRESHOLD)} />
              </td>
            </tr>
            <tr>
              <td className="paper">
                <TextField label={WET_HYSTERESIS} value={payload[WET_HYSTERESIS] || ''} onInput={this.set(WET_HYSTERESIS)} />
              </td>
              <td className="paper">
                <TextField label={WET_THRESHOLD} value={payload[WET_THRESHOLD] || ''} onInput={this.set(WET_THRESHOLD)} />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td className="paper">
                <Typography use="caption">{START_DRY}</Typography>
              </td>
              <td className="paper">
                <SelectScript
                  id={payload.onStartDry}
                  project={project}
                  onSelect={this.on(onStartDry)}
                />
              </td>
              <td className="paper">
                {
                  payload.onStartDry && (
                    <Typography use="caption" onClick={this.remove(onStartDry)}><strong> X </strong></Typography>
                  )
                }
              </td>
            </tr>
            <tr>
              <td className="paper">
                <Typography use="caption">{STOP_DRY}</Typography>
              </td>
              <td className="paper">
                <SelectScript
                  id={payload.onStopDry}
                  project={project}
                  onSelect={this.on(onStopDry)}
                />
              </td>
              <td className="paper">
                {
                  payload.onStopDry && (
                    <Typography use="caption" onClick={this.remove(onStopDry)}><strong> X </strong></Typography>
                  )
                }
              </td>
            </tr>
            <tr>
              <td className="paper">
                <Typography use="caption">{START_WET}</Typography>
              </td>
              <td className="paper">
                <SelectScript
                  id={payload.onStartWet}
                  project={project}
                  onSelect={this.on(onStartWet)}
                />
              </td>
              <td className="paper">
                {
                  payload.onStartWet && (
                    <Typography use="caption" onClick={this.remove(onStartWet)}><strong> X </strong></Typography>
                  )
                }
              </td>
            </tr>
            <tr>
              <td className="paper">
                <Typography use="caption">{STOP_WET}</Typography>
              </td>
              <td className="paper">
                <SelectScript
                  id={payload.onStopWet}
                  project={project}
                  onSelect={this.on(onStopWet)}
                />
              </td>
              <td className="paper">
                {
                  payload.onStopWet && (
                    <Typography use="caption" onClick={this.remove(onStopWet)}><strong> X </strong></Typography>
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

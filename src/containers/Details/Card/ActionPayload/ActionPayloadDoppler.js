
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { set } from '../../../../actions';
import SelectScript from '../../SelectScript';
import SelectDoppler from './SelectDoppler';
import DeviceDoppler from '../../../Device/DeviceDoppler';
import { onHighThreshold, onLowThreshold, onQuiet, QUIET, HIGH_THRESHOLD, LOW_THRESHOLD } from '../../../../constants';

type Props = {
  id: string;
  project: string;
  daemon: string;
  payload: ?{};
  setLow: (value: number) => void;
  setHigh: (value: number) => void;
  on: (on: string, id: string) => void;
};

class Container extends Component<Props> {
  high = (event) => {
    this.props.setHigh(event.target.value);
  };

  low = (event) => {
    this.props.setLow(event.target.value);
  };

  on = (on) => (id) => {
    this.props.on(on, id);
  };

  render() {
    const {
      id, project, payload = {}, daemon
    } = this.props;
    return (
      <div className="paper">
        <SelectDoppler action={id} payload={payload} project={project} root={project} />
        <DeviceDoppler id={payload.id} daemon={daemon} />
        <table>
          <tbody>
            <tr>
              <td>
                <TextField label={HIGH_THRESHOLD} type="number" value={payload.high || ''} onInput={this.high} />
              </td>
              <td>
                <SelectScript
                  id={payload.onHighThreshold}
                  project={project}
                  onSelect={this.on(onHighThreshold)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <TextField label={LOW_THRESHOLD} type="number" value={payload.low || ''} onInput={this.low} />
              </td>
              <td>
                <SelectScript
                  id={payload.onLowThreshold}
                  project={project}
                  onSelect={this.on(onLowThreshold)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Typography use="caption">{QUIET}</Typography>
              </td>
              <td>
                <SelectScript
                  id={payload.onQuiet}
                  project={project}
                  onSelect={this.on(onQuiet)}
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
    setLow: (low) => set(id, { payload: { ...payload, low } }),
    setHigh: (high) => set(id, { payload: { ...payload, high } }),
    on: (on, script) => set(id, { payload: { ...payload, [on]: script } })
  }, dispatch)
)(Container);

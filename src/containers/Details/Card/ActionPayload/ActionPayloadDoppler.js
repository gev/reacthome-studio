
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../../actions';
import { HIGH_THRESHOLD, LOW_THRESHOLD, QUIET, onHighThreshold, onLowThreshold, onQuiet } from '../../../../constants';
import DeviceDoppler from '../../../Device/DeviceDoppler';
import SelectScript from '../../SelectScript';
import SelectDoppler from './SelectDoppler';


class Container extends Component {
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
        <table>
          <tr>
            <td><div className='paper'>doppler</div></td>
            <td><SelectDoppler action={id} payload={payload} project={project} root={project} /></td>
          </tr>
        </table>
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
    setLow: (low) => modify(id, { payload: { ...payload, low } }),
    setHigh: (high) => modify(id, { payload: { ...payload, high } }),
    on: (on, script) => modify(id, { payload: { ...payload, [on]: script } })
  }, dispatch)
)(Container);

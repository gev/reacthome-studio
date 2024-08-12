
import { Radio } from '@rmwc/radio';
import { Switch } from '@rmwc/switch';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../actions';
import Slider from '../../../components/Slider';
import { ACTION_OFF, ACTION_ON, ACTION_SETPOINT, ACTION_SET_DIRECTION, ACTION_SET_FAN_SPEED, ACTION_SET_MODE, CODE, TITLE } from '../../../constants';
import { send } from '../../../websocket/peer';

const Check = ({ checked, onChange, label }) => (
  <td>
    <div><Typography use="caption">{label}</Typography></div>
    <div><Radio checked={checked} onChange={onChange} /></div>
  </td>
);

class Container extends Component {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  select = (bind) => {
    const { id } = this.props;
    this.props.makeBind(id, bind);
  }
  toggle = ({ target: { checked } }) => {
    const { id, daemon, index } = this.props;
    const type = checked ? ACTION_ON : ACTION_OFF;
    send(daemon, { id, type, index });
  };
  setFanSpeed = ({ detail: { value } }) => {
    const { id, daemon, index } = this.props;
    send(daemon, { id, type: ACTION_SET_FAN_SPEED, index, value });
  };
  setMode = (value) => () => {
    const { id, daemon, index } = this.props;
    send(daemon, { id, type: ACTION_SET_MODE, index, value });
  };
  setDirection = (value) => () => {
    const { id, daemon, index } = this.props;
    send(daemon, { id, type: ACTION_SET_DIRECTION, index, value });
  };
  setPoint = ({ detail: { value } }) => {
    const { id, daemon, index } = this.props;
    send(daemon, { id, type: ACTION_SETPOINT, index, value });
  };
  render() {
    const {
      code, project, bind, title, fan_speed, value, mode, setpoint, direction, removeField
    } = this.props;
    return (
      <div>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <div className="paper">
          <Switch checked={!!value} onChange={this.toggle} />
        </div>
        <div className="paper">
          <table>
            <tbody>
              <tr>
                <Check checked={mode === 3} onChange={this.setMode(0)} label="Vent" />
                <Check checked={mode === 2} onChange={this.setMode(1)} label="Dry" />
                <Check checked={mode === 1} onChange={this.setMode(2)} label="Heat" />
                <Check checked={mode === 4} onChange={this.setMode(3)} label="Cool" />
                <Check checked={mode === 0} onChange={this.setMode(4)} label="Auto" />
              </tr>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <Typography>Fan speed</Typography>
          <Slider
            id="fan speed"
            min={0}
            step={1}
            max={3}
            value={fan_speed || 0}
            onInput={this.setFanSpeed}
            discrete
          />
        </div>
        <div className="paper">
          <Typography>Set point</Typography>
          <Slider
            label="setpoint"
            min={16}
            step={1}
            max={32}
            value={setpoint || 0}
            onInput={this.setPoint}
            discrete
          />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id, index }) => pool[`${id}/ac/${index}`] || {},
  (dispatch, { id, index }) => bindActionCreators({
    change: (payload) => modify(`${id}/ac/${index}`, payload),
  }, dispatch)
)(Container);

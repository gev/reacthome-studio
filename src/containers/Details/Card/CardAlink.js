
import {
  Card,
  CardActionIcons,
  CardActions
} from '@rmwc/card';
import { Radio } from '@rmwc/radio';
import { Switch } from '@rmwc/switch';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { makeBind, modify, remove } from '../../../actions';
import CardActionRemove from '../../../components/CardActionRemove';
import Slider from '../../../components/Slider';
import { ACTION_OFF, ACTION_ON, ACTION_SETPOINT, ACTION_SET_FAN_SPEED, ACTION_SET_MODE, CODE, TITLE } from '../../../constants';
import { send } from '../../../websocket/peer';
import SelectModbus from './SelectModbus';

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
    const { id, daemon } = this.props;
    const type = checked ? ACTION_ON : ACTION_OFF;
    send(daemon, { id, type });
  };
  setFanSpeed = (value) => () => {
    const { id, daemon } = this.props;
    send(daemon, { id, type: ACTION_SET_FAN_SPEED, value });
  };
  setMode = (value) => () => {
    const { id, daemon } = this.props;
    send(daemon, { id, type: ACTION_SET_MODE, value });
  };
  setPoint = ({ detail: { value } }) => {
    const { id, daemon } = this.props;
    send(daemon, { id, type: ACTION_SETPOINT, value });
  };
  render() {
    const {
      code, project, bind, title, fan_speed, value, mode, setpoint, removeField
    } = this.props;
    return (
      <Card>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <div className="paper">
          <SelectModbus id={bind} root={project} onSelect={this.select} />
        </div>
        <div className="paper">
          <Switch checked={!!value} onChange={this.toggle} />
        </div>
        <div className="paper">
          <table>
            <tbody>
              <tr>
                <Check checked={mode === 0} onChange={this.setMode(0)} label="Auto" />
                <Check checked={mode === 1} onChange={this.setMode(1)} label="Cool" />
                <Check checked={mode === 2} onChange={this.setMode(2)} label="Dry" />
                <Check checked={mode === 3} onChange={this.setMode(3)} label="Health" />
                <Check checked={mode === 4} onChange={this.setMode(4)} label="Heat" />
                <Check checked={mode === 6} onChange={this.setMode(6)} label="Fan" />
              </tr>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <tr>
                <Check checked={fan_speed === 1} onChange={this.setFanSpeed(1)} label="High" />
                <Check checked={fan_speed === 2} onChange={this.setFanSpeed(2)} label="Medium" />
                <Check checked={fan_speed === 3} onChange={this.setFanSpeed(3)} label="Low" />
                <Check checked={fan_speed === 4} onChange={this.setFanSpeed(4)} label="Breeze" />
                <Check checked={fan_speed === 5} onChange={this.setFanSpeed(5)} label="Auto" />
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className="paper">
          <table>
            <tbody>
              <tr>
                <Check checked={direction === 0} onChange={this.setDirection(0)} label="Auto" />
                <Check checked={direction === 1} onChange={this.setDirection(1)} label="Hor" />
                <Check checked={direction === 2} onChange={this.setDirection(2)} label="2" />
                <Check checked={direction === 3} onChange={this.setDirection(3)} label="3" />
                <Check checked={direction === 4} onChange={this.setDirection(4)} label="4" />
                <Check checked={direction === 5} onChange={this.setDirection(5)} label="Vert" />
                <Check checked={direction === 6} onChange={this.setDirection(6)} label="Swing" />
              </tr>
            </tbody>
          </table>
        </div> */}
        <div className="paper">
          <Typography>Set point</Typography>
          <Slider
            label="setpoint"
            min={16}
            step={1}
            max={31}
            value={setpoint || 0}
            onInput={this.setPoint}
            discrete
          />
        </div>
        <CardActions>
          <CardActionIcons>
            <CardActionRemove remove={removeField} />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, {
    project, parent, id, field, multiple
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    details: () => push(`/project/${project}/${id}`),
    change: (payload) => modify(id, payload),
    makeBind
  }, dispatch)
)(Container);

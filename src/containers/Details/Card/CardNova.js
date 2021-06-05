
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';
import { Radio } from '@rmwc/radio';
import { Slider } from '@rmwc/slider';
import { Switch } from '@rmwc/switch';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { remove, modify, makeBind } from '../../../actions';
import { ACTION_OFF, ACTION_ON, ACTION_SETPOINT, ACTION_SET_ADDRESS, ACTION_SET_DIRECTION, ACTION_SET_FAN_SPEED, ACTION_SET_MODE, CODE, TITLE } from '../../../constants';
import SelectModbus from './SelectModbus';
import { send } from '../../../websocket/peer';

type Props = {
  id: string;
  bind: ?string;
  code: ?string,
  title: ?string;
  project: string,
  daemon: string,
  change: (payload: {}) => void,
  removeField: () => void,
  makeBind: (id: string, bind: string) => void
};

const Check = ({checked, onChange, label}) => (
  <td>
    <div><Typography use="caption">{label}</Typography></div>
    <div><Radio checked={checked} onChange={onChange} /></div>
  </td>
);

class Container extends Component<Props> {
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
  setFanSpeed = ({ detail: { value } }) => {
    const { id, daemon } = this.props;
    send(daemon, { id, type: ACTION_SET_FAN_SPEED, value });
  };
  setMode = (value) => () => {
    const { id, daemon } = this.props;
    send(daemon, { id, type: ACTION_SET_MODE, value });
  };
  setDirection = (value) => () => {
    const { id, daemon } = this.props;
    send(daemon, { id, type: ACTION_SET_DIRECTION, value });
  };
  setPoint = ({ detail: { value } }) => {
    const { id, daemon } = this.props;
    send(daemon, { id, type: ACTION_SETPOINT, value });
  };
  render() {
    const {
      code, project, bind, title, fan_speed, value, setpoint, removeField
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
          <Typography>Fan speed</Typography>
          <Slider
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
            min={0}
            step={1}
            max={30}
            value={setpoint || 0}
            onInput={this.setPoint}
            discrete
          />
        </div>
        <CardActions>
          <CardActionIcons>
            <CardAction icon="remove" onClick={removeField} />
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


import {
  Card,
  CardActionIcons,
  CardActions
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { makeBind, modify, remove } from '../../../actions';
import CardActionRemove from '../../../components/CardActionRemove';
import Slider from '../../../components/Slider';
import { ACTION_SET_ADDRESS, ACTION_SET_FAN_SPEED, CODE, TITLE } from '../../../constants';
import { send } from '../../../websocket/peer';
import SelectModbus from './SelectModbus';


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
  setAddress = () => {
    const { id, daemon, bind } = this.props;
    const [, , value] = (bind || '').split('/');
    this.props.makeBind(id, bind);
    send(daemon, { id, type: ACTION_SET_ADDRESS, value });
  }
  setFanSpeed = (value) => {
    const { id, daemon } = this.props;
    send(daemon, { id, type: ACTION_SET_FAN_SPEED, value });
  };
  render() {
    const {
      code, project, bind, title, fan_speed, removeField
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
          <SelectModbus id={bind} root={project} onSelect={this.select} onSetAddress={this.setAddress} />
        </div>
        <div className="paper">
          <Typography>Fan speed</Typography>
          <Slider
            label="fan speed"
            min={0}
            step={1}
            max={100}
            value={fan_speed || 0}
            onInput={(event) => this.setFanSpeed(event.detail.value)}
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

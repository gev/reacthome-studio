
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';
import { Slider } from '@rmwc/slider';
import { TextField } from '@rmwc/textfield';
import { remove, modify, request } from '../../../actions';
import { CODE, TITLE, ACTION_SETPOINT } from '../../../constants';
import SelectSensor from './SelectSensor';

type Props = {
  sensor: ?string,
  project: ?string,
  setpoint: ?number,
  code: ?string,
  title: ?string,
  change: (payload: {}) => void,
  removeField: () => void,
  setSetpoint: (value: ?number) => void
};

class Container extends Component<Props> {
  setpoint = (event) => {
    this.props.setSetpoint(event.detail.value);
  }
  setSensor = (sensor) => {
    this.props.change({ sensor });
  }
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  render() {
    const {
      code, title, removeField, sensor, project, setpoint
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
          <Slider value={setpoint || 25} min={15} max={35} step={1} onInput={this.setpoint} discrete />
        </div>
        <div className="paper">
          <SelectSensor id={sensor} root={project} onSelect={this.setSensor} />
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
    parent, id, field, multiple, daemon
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    setSetpoint: (value) => request(daemon, { id, type: ACTION_SETPOINT, value }),
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);

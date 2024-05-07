
import {
  Card,
  CardActionIcons,
  CardActions
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify, remove, request } from '../../../actions';
import CardActionRemove from '../../../components/CardActionRemove';
import Slider from '../../../components/Slider';
import { ACTION_SETPOINT, CODE, TITLE } from '../../../constants';

class Container extends Component {
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
          <Slider label="setpoint" value={setpoint || 25} min={15} max={35} step={1} onInput={this.setpoint} discrete />
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
    parent, id, field, multiple, daemon
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    setSetpoint: (value) => request(daemon, { id, type: ACTION_SETPOINT, value }),
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);

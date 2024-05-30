
import {
  Card,
  CardActionIcons,
  CardActions
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify, remove, request } from '../../../actions';
import CardActionRemove from '../../../components/CardActionRemove';
import Slider from '../../../components/Slider';
import { ACTION_SETPOINT, CODE, COOL_HYSTERESIS, COOL_THRESHOLD, HEAT_HYSTERESIS, HEAT_THRESHOLD, START_COOL, START_HEAT, STOP_COOL, STOP_HEAT, TITLE, onStartCool, onStartHeat, onStopCool, onStopHeat } from '../../../constants';
import SelectScript from '../SelectScript';

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
  set = (key) => (event) => {
    this.props.change({ [key]: event.target.value });
  };
  on = (on) => (id) => {
    this.props.change({ [on]: id });
  };

  remove = (on) => () => {
    this.props.change({ [on]: null });
  }

  render() {
    const {
      code, title, removeField, setpoint, project
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
        <div>
          <table>
            <tbody>
              <tr>
                <td className="paper">
                  <TextField label={COOL_HYSTERESIS} value={this.props[COOL_HYSTERESIS] || ''} onInput={this.set(COOL_HYSTERESIS)} />
                </td>
                <td className="paper">
                  <TextField label={COOL_THRESHOLD} value={this.props[COOL_THRESHOLD] || ''} onInput={this.set(COOL_THRESHOLD)} />
                </td>
              </tr>
              <tr>
                <td className="paper">
                  <TextField label={HEAT_HYSTERESIS} value={this.props[HEAT_HYSTERESIS] || ''} onInput={this.set(HEAT_HYSTERESIS)} />
                </td>
                <td className="paper">
                  <TextField label={HEAT_THRESHOLD} value={this.props[HEAT_THRESHOLD] || ''} onInput={this.set(HEAT_THRESHOLD)} />
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td className="paper">
                  <Typography use="caption">{START_COOL}</Typography>
                </td>
                <td className="paper">
                  <SelectScript
                    id={this.props.onStartCool}
                    project={project}
                    onSelect={this.on(onStartCool)}
                  />
                </td>
                <td className="paper">
                  {
                    this.props.onStartCool && (
                      <Typography use="caption" onClick={this.remove(onStartCool)}><strong> X </strong></Typography>
                    )
                  }
                </td>
              </tr>
              <tr>
                <td className="paper">
                  <Typography use="caption">{STOP_COOL}</Typography>
                </td>
                <td className="paper">
                  <SelectScript
                    id={this.props.onStopCool}
                    project={project}
                    onSelect={this.on(onStopCool)}
                  />
                </td>
                <td className="paper">
                  {
                    this.props.onStopCool && (
                      <Typography use="caption" onClick={this.remove(onStopCool)}><strong> X </strong></Typography>
                    )
                  }
                </td>
              </tr>
              <tr>
                <td className="paper">
                  <Typography use="caption">{START_HEAT}</Typography>
                </td>
                <td className="paper">
                  <SelectScript
                    id={this.props.onStartHeat}
                    project={project}
                    onSelect={this.on(onStartHeat)}
                  />
                </td>
                <td className="paper">
                  {
                    this.props.onStartHeat && (
                      <Typography use="caption" onClick={this.remove(onStartHeat)}><strong> X </strong></Typography>
                    )
                  }
                </td>
              </tr>
              <tr>
                <td className="paper">
                  <Typography use="caption">{STOP_HEAT}</Typography>
                </td>
                <td className="paper">
                  <SelectScript
                    id={this.props.onStopHeat}
                    project={project}
                    onSelect={this.on(onStopHeat)}
                  />
                </td>
                <td className="paper">
                  {
                    this.props.onStopHeat && (
                      <Typography use="caption" onClick={this.remove(onStopHeat)}><strong> X </strong></Typography>
                    )
                  }
                </td>
              </tr>
            </tbody>
          </table>
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
    setSetpoint: (temperature) => request(daemon, { id, type: ACTION_SETPOINT, temperature }),
    change: (payload) => modify(id, payload),
  }, dispatch)
)(Container);


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
import { ACTION_SETPOINT, CODE, DRY_HYSTERESIS, DRY_THRESHOLD, START_DRY, START_WET, STOP_DRY, STOP_WET, TITLE, WET_HYSTERESIS, WET_THRESHOLD, onStartDry, onStartWet, onStopDry, onStopWet } from '../../../constants';
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
          <Slider label="setpoint" value={setpoint || 50} min={10} max={90} step={1} onInput={this.setpoint} discrete />
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td className="paper">
                  <TextField label={DRY_HYSTERESIS} value={this.props[DRY_HYSTERESIS] || ''} onInput={this.set(DRY_HYSTERESIS)} />
                </td>
                <td className="paper">
                  <TextField label={DRY_THRESHOLD} value={this.props[DRY_THRESHOLD] || ''} onInput={this.set(DRY_THRESHOLD)} />
                </td>
              </tr>
              <tr>
                <td className="paper">
                  <TextField label={WET_HYSTERESIS} value={this.props[WET_HYSTERESIS] || ''} onInput={this.set(WET_HYSTERESIS)} />
                </td>
                <td className="paper">
                  <TextField label={WET_THRESHOLD} value={this.props[WET_THRESHOLD] || ''} onInput={this.set(WET_THRESHOLD)} />
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
                    id={this.props.onStartDry}
                    project={project}
                    onSelect={this.on(onStartDry)}
                  />
                </td>
                <td className="paper">
                  {
                    this.props.onStartDry && (
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
                    id={this.props.onStopDry}
                    project={project}
                    onSelect={this.on(onStopDry)}
                  />
                </td>
                <td className="paper">
                  {
                    this.props.onStopDry && (
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
                    id={this.props.onStartWet}
                    project={project}
                    onSelect={this.on(onStartWet)}
                  />
                </td>
                <td className="paper">
                  {
                    this.props.onStartWet && (
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
                    id={this.props.onStopWet}
                    project={project}
                    onSelect={this.on(onStopWet)}
                  />
                </td>
                <td className="paper">
                  {
                    this.props.onStopWet && (
                      <Typography use="caption" onClick={this.remove(onStopWet)}><strong> X </strong></Typography>
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
    setSetpoint: (humidity) => request(daemon, { id, type: ACTION_SETPOINT, humidity }),
    change: (payload) => modify(id, payload),
  }, dispatch)
)(Container);

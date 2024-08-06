
import {
  Card,
  CardActionIcons,
  CardActions
} from '@rmwc/card';
import { Checkbox } from '@rmwc/checkbox';
import { TextField } from '@rmwc/textfield';
import Typography from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { makeBind, modify, remove } from '../../../actions';
import CardActionRemove from '../../../components/CardActionRemove';
import Slider from '../../../components/Slider';
import { CODE, TITLE } from '../../../constants';
import Autocomplete from '../../Filter';
import SelectScript from '../SelectScript';
import Do from './CardDoBind';
import DeviceDo from './DeviceDo';
import SelectDo from './SelectDo';

const Sensor = connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    onSelect: (onTemperature) => modify(id, { onTemperature })
  }, dispatch)
)(({
  code, title, remove, onTemperature, onSelect, project,
  temperature
}) => (
  <table>
    <tbody>
      <tr>
        <td>
          <div>
            <Typography>{code || title}</Typography>
            <br />
            <Typography>{temperature}°C</Typography>
          </div>
          <Typography use="caption" onClick={remove}><strong> X </strong></Typography>
        </td>
        <td>
          <SelectScript id={onTemperature} project={project} onSelect={onSelect} />
          {
            onTemperature &&
            <Typography use="caption" onClick={() => onSelect(null)}><strong> X </strong></Typography>
          }
        </td>
      </tr>
    </tbody>
  </table>
));

class Container extends Component {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  setmin = (event) => {
    const { max = 60 } = this.props;
    const { value } = event.detail;
    this.props.change({ min: value < max ? value : max });
  }
  setmax = (event) => {
    const { min = 17 } = this.props;
    const { value } = event.detail;
    this.props.change({ max: value > min ? value : min });
  }
  selectSensor = (sensor) => {
    this.props.change({ sensor });
  }
  selectActuator = (bind) => {
    const { id } = this.props;
    this.props.makeBind(id, bind);
  }
  render() {
    const {
      code, project, daemon, bind, title, removeField, min, max, inverse
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
          <Checkbox label="Inverse" checked={inverse} onChange={() => {
            this.props.change({ inverse: !inverse })
          }} />
        </div>
        <div className="paper">
          <SelectDo id={bind} root={project} onSelect={this.selectActuator} />
        </div>
        {
          bind && [
            <table key="bind">
              <tbody>
                <Do id={bind} project={project} />
              </tbody>
            </table>,
            <DeviceDo id={bind} daemon={daemon} />
          ]
        }
        <div className="paper">
          <Autocomplete id={this.props.sensor} root={project} onSelect={this.selectSensor} />
        </div>
        {
          this.props.sensor && (
            <div className="paper">
              <Sensor id={this.props.sensor} project={project} remove={() => this.selectSensor(null)} />
            </div>
          )
        }
        {this.props.sensor && (
          <table>
            <tbody>
              <tr>
                <td width="50%">
                  <div className="paper">
                    <Slider label="setpoint min" value={min || 20} min={15} max={60} step={1} onInput={this.setmin} discrete />
                  </div>
                </td>
                <td width="50%">
                  <div className="paper">
                    <Slider label="setpoint max" value={max || 30} min={15} max={60} step={1} onInput={this.setmax} discrete />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
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
    change: (payload) => modify(id, payload),
    makeBind
  }, dispatch)
)(Container);

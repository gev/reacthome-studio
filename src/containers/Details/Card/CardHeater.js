
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
import { Slider } from '@rmwc/slider';
import { TextField } from '@rmwc/textfield';
import { remove, modify, makeBind } from '../../../actions';
import { CODE, TITLE } from '../../../constants';
import Autocomplete from '../../Filter';
import DeviceDo from './DeviceDo';
import SelectDo from './SelectDo';
import Do from './CardDoBind';
import Typography from '@rmwc/typography';
import SelectScript from '../SelectScript';

const Sensor = connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    onSelect: (onTemperature) => modify(id, { onTemperature })
  }, dispatch)
)(({
  code, title, remove, onTemperature, onSelect, project
}) => (
  <table>
    <tbody>
      <tr>
        <td>
          <Typography>{code || title}</Typography>
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
    const { max = 35 } = this.props;
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
      id, code, project, daemon, bind, title, removeField, min, max
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
          <Slider value={min || 20} min={15} max={35} step={1} onInput={this.setmin} discrete />
        </div>
        <div className="paper">
          <Slider value={max || 30} min={15} max={35} step={1} onInput={this.setmax} discrete />
        </div>
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

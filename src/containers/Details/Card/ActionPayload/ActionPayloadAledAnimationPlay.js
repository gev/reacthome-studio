
import React, { Component } from 'react';
import { Button, Checkbox, MenuItem, SimpleMenu } from 'rmwc';
import Slider from '../../../../components/Slider';
import Autocomplete from '../../../Filter';

const a = (title, n) => ({ title, n });

export const colorAnimations = {
  0x00: a('Fade', 4),
  0x10: a('SpectrumT', 4),
  0x11: a('SpectrumX', 4),
  0x20: a('RandomT', 0),
  0x21: a('RandomX', 0),
}

export const maskAnimations = {
  0x00: a("Off", 0),
  0x01: a("FadeOff", 0),
  0x02: a("RandomOff", 0),
  0x03: a("SlideOff", 0),
  0x04: a("SlideOff'", 0),
  0x05: a("SlideOffIn", 0),
  0x06: a("SlideOffOut", 0),

  0x10: a("On", 0),
  0x11: a("FadeOn", 0),
  0x12: a("RandomOn", 0),
  0x13: a("SlideOn", 0),
  0x14: a("SlideOn'", 0),
  0x15: a("SlideOnIn", 0),
  0x16: a("SlideOnOut", 0),

  0x20: a("Blink", 0),
  0x21: a("Random", 3),
  0x22: a("Eiffel", 3),
  0x23: a("Slide", 2),
  0x24: a("Slide'", 2),
  0x25: a("Slide''", 2),
  0xff: a("Const", 0),
}


export default class extends Component {
  select = (id) => {
    const { change, payload = {} } = this.props;
    change({ payload: { ...payload, id } });
  }

  setType = (animation) => () => {
    const { change, payload = {} } = this.props;
    change({ payload: { ...payload, animation } });
  }

  setDuration = ({ detail: { value } }) => {
    const { change, payload = {} } = this.props;
    change({ payload: { ...payload, duration: value } });
  }

  setPhase = ({ detail: { value } }) => {
    const { change, payload = {} } = this.props;
    change({ payload: { ...payload, phase: value } });
  }

  scaleDuration = v => 4 * (v + 1) / 25;

  scalePhase = v => (v - 128) / 25;

  setLoop = () => {
    const { change, payload = {} } = this.props;
    change({ payload: { ...payload, loop: !payload.loop } });
  }

  setSplit = () => {
    const { change, payload = {} } = this.props;
    change({ payload: { ...payload, split: !payload.split } });
  }

  setParam = (i) => ({ detail: { value } }) => {
    const { change, payload = {} } = this.props;
    const params = [...payload.params || []];
    params[i] = value;
    change({ payload: { ...payload, params } });
  }

  render() {
    const { root, payload = {}, animations = {} } = this.props;
    const { id, duration = 5, phase = 128, loop = false, split = true, params = [] } = payload;
    const animation = animations[payload.animation] || {};
    return (
      <div>
        <div className="paper">
          <Autocomplete id={id} root={root} onSelect={this.select} />
        </div>
        <table>
          <tbody>
            <tr>
              <td width="50%">
                <div className="paper">
                  <Slider label="Duration, s" value={duration} min={0} max={255} step={1} onInput={this.setDuration} scale={this.scaleDuration} />
                </div>
              </td>
              <td width="50%">
                <div className="paper">
                  <Slider label="Phase, s" value={phase} min={0} max={255} step={1} onInput={this.setPhase} scale={this.scalePhase} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td width="50%">
                <Checkbox label="Loop" checked={loop} onChange={this.setLoop} />
              </td>
              <td width="50%">
                <Checkbox label="Split" checked={split} onChange={this.setSplit} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="paper">
          <SimpleMenu handle={<Button>{animation.title || 'Animation'}</Button>}>
            {
              Object.entries(animations).map(([k, { title }]) => (
                <MenuItem key={`${this.props.id}/a/${k}`} onClick={this.setType(parseInt(k, 10))}>{title}</MenuItem>
              ))
            }
          </SimpleMenu>
        </div>
        {
          animation.n > 0 && (
            Array(animation.n).fill(0).map((_, i) => (
              <div className="paper">
                <Slider key={`${this.props.id}/p/${i + 1}`} label={`Param ${i + 1}`} value={params[i] || 0} min={0} max={255} step={1} onInput={this.setParam(i)} />
              </div>
            ))
          )
        }
      </div>
    );
  }
}
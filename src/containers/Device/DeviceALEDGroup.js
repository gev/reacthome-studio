
import React, { Component } from 'react';

import { Button, MenuItem, SimpleMenu, Switch, TextField } from 'rmwc';

import { connect } from 'react-redux';
import Slider from '../../components/Slider';
import DeviceALEDSegment from './DeviceALEDSegment';

import { ACTION_ALED_BRIGHTNESS, ACTION_ALED_CONFIG_GROUP, ACTION_ALED_OFF, ACTION_ALED_ON } from '../../constants';
import { send } from '../../websocket/peer';

const pixelTypes = ['None', 'Red', 'Green', 'Blue', 'White', 'Cool', 'Warm'];

class Container extends Component {

  setSegmentsNumber = ({ target: { value } }) => {
    let n = parseInt(value, 10) || 0;
    if (n < 0) n = 0;
    if (n > 100) n = 100;
    const segments = new Array(n).fill({});
    if (Array.isArray(this.props.segments)) {
      for (let i = 0; i < Math.min(n, this.props.segments.length); i++) {
        segments[i] = this.props.segments[i];
      }
    }
    const { id, daemon, index } = this.props;
    send(daemon, { type: ACTION_ALED_CONFIG_GROUP, id, index, segments });
  }

  changeSegments = (i) => (segment) => {
    const segments = [...this.props.segments];
    segments[i] = segment;
    const { id, daemon, index } = this.props;
    send(daemon, { type: ACTION_ALED_CONFIG_GROUP, id, index, segments });
  }

  setBrightness = ({ detail: { value } }) => {
    const { id, daemon, index } = this.props;
    send(daemon, { type: ACTION_ALED_BRIGHTNESS, id, index, value });
  }

  setValue = value => () => {
    const { id, daemon, index } = this.props;
    send(daemon, { type: value ? ACTION_ALED_ON : ACTION_ALED_OFF, id, index });
  }

  setColors = (colors) => () => {
    const { id, daemon, index } = this.props;
    send(daemon, { type: ACTION_ALED_CONFIG_GROUP, id, index, colors });
  }

  render() {
    const { brightness = 128, value = false, colors = 3, index } = this.props;
    let { segments } = this.props;
    if (!Array.isArray(segments)) {
      segments = [];
    }
    return (
      <div>
        <table width="100%">
          <tbody>
            <tr>
              <td className="paper" width={100}>
                <SimpleMenu handle={<Button>{colors} colors</Button>} >
                  <MenuItem onClick={this.setColors(2)}>2</MenuItem>
                  <MenuItem onClick={this.setColors(3)}>3</MenuItem>
                  <MenuItem onClick={this.setColors(4)}>4</MenuItem>
                </SimpleMenu>
              </td>
              <td className="paper">
                <Slider label="Brightness" value={brightness} min={0} max={255} step={1} onInput={this.setBrightness} discrete />
              </td>
              <td className="paper" width={10}>
                <Switch checked={value} onChange={this.setValue(!value)} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="paper">
          <TextField value={segments.length} label="Segments" type="number" onChange={this.setSegmentsNumber} />
        </div>
        {
          segments.length > 0 && (
            <div style={{ maxHeight: 350, overflowY: 'auto' }}>
              <table>
                <tbody>
                  {segments.map(({ direction, size }, i) =>
                    <DeviceALEDSegment
                      key={`${this.props.id}/${index}/${i}`}
                      index={i + 1}
                      direction={direction}
                      size={size}
                      onChange={this.changeSegments(i)} />
                  )}
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id, index }) => pool[`${id}/group/${index}`] || {}
)(Container);

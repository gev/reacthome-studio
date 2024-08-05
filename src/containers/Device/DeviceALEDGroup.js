
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { Button, MenuItem, SimpleMenu, Switch, TextField } from 'rmwc';

import { modify } from '../../actions';
import Slider from '../../components/Slider';
import DeviceALEDSegment from './DeviceALEDSegment';

const pixelTypes = ['None', 'Red', 'Green', 'Blue', 'White', 'Cool', 'Warm'];

class Container extends Component {
  setSegments = ({ target: { value } }) => {
    let segments = parseInt(value, 10) || 0;
    if (segments < 0) segments = 0;
    if (segments > 100) segments = 100;
    this.props.change({ segments });
  }

  setBrightness = ({ detail: { value } }) => {
    this.props.change({ brightness: value });
  }

  setValue = value => () => {
    this.props.change({ value });
  }

  setType = type => () => {
    this.props.change({ type });
  }

  setColors = (colors) => () => {
    this.props.change({ colors });
  }

  render() {
    const { segments = 0, brightness = 128, value = false, colors = 3 } = this.props;
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
          <TextField value={segments} label="Segments" type="number" onChange={this.setSegments} />
        </div>
        {
          segments > 0 && (
            <div style={{ maxHeight: 350, overflowY: 'auto' }}>
              <table>
                <tbody>
                  {Array(Math.min(100, segments)).fill(0).map((_, i) => {
                    const id = `${this.props.id}/${i + 1}`;
                    return (
                      <DeviceALEDSegment key={id} id={id} index={i + 1} />);
                  })}
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
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => (bindActionCreators({
    change: (payload) => modify(id, payload),
  }, dispatch))
)(Container);

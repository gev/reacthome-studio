
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { Button, MenuItem, SimpleMenu, TextField, Typography } from 'rmwc';

import { modify } from '../../actions';
import Slider from '../../components/Slider';

class Container extends Component {
  setSegmentDirection = direction => () => {
    this.props.change({ direction });
  }

  setSize = ({ target: { value } }) => {
    let size = parseInt(value, 10) || 0;
    if (size < 0) size = 0;
    if (size > 1000) size = 1000;
    this.props.change({ size });
  }

  setBrightness = ({ detail: { value } }) => {
    this.props.change({ brightness: value });
  }

  render() {
    const { index, direction = 0, size = 0, brightness = 255 } = this.props;
    return (
      <tr>
        <td className="paper" width={20}>
          <Typography use="body">{index}</Typography>
        </td>
        <td className="paper" width={50}>
          <SimpleMenu handle={<Button>{direction ? '<-' : '->'}</Button>} >
            <MenuItem onClick={this.setSegmentDirection(0)}>{'->'}</MenuItem>
            <MenuItem onClick={this.setSegmentDirection(1)}>{'<-'}</MenuItem>
          </SimpleMenu>
        </td>
        <td className="paper" width={100}>
          <TextField value={size} label="Size" type="number" onChange={this.setSize} />
        </td>
        <td className="paper">
          <Slider label="Brightness" value={brightness} min={0} max={255} step={1} onInput={this.setBrightness} discrete />
        </td>
      </tr>
    );
  }
}



export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => (bindActionCreators({
    change: (payload) => modify(id, payload),
  }, dispatch))
)(Container);

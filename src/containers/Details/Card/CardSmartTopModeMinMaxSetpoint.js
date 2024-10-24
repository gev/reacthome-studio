
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, SimpleMenu } from 'rmwc';
import { modify } from '../../../actions';
import MenuItem from './MenuItem';


class Container extends Component {
  state = { index: 0 }

  select = ({ detail: { index } }) => {
    this.setState({ index });
  }

  setMinPalette = (palette_setpoint_min) => () => {
    this.props.change({ palette_setpoint_min });
  }

  setMaxPalette = (palette_setpoint_max) => () => {
    this.props.change({ palette_setpoint_max });
  }

  render() {
    const { id, palette_setpoint_min, palette_setpoint_max } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td><div className="paper">Min setpoint palette</div></td>
            <td>
              <div className="paper">
                <SimpleMenu handle={<Button>{palette_setpoint_min || `None`}</Button>}>
                  {
                    (new Array(13)).fill(0).map((v, i) => (
                      <MenuItem key={`${id}/palette_setpoint_min/${i}`} index={i} onClick={this.setMinPalette(i)}>{i || `None`}</MenuItem>
                    ))
                  }
                </SimpleMenu>
              </div>
            </td>
          </tr>
          <tr>
            <td><div className="paper">Max setpoint palette</div></td>
            <td>
              <div className="paper">
                <SimpleMenu handle={<Button>{palette_setpoint_max || `None`}</Button>}>
                  {
                    (new Array(13)).fill(0).map((v, i) => (
                      <MenuItem key={`${id}/palette_setpoint_max/${i}`} index={i} onClick={this.setMaxPalette(i)}>{i || `None`}</MenuItem>
                    ))
                  }
                </SimpleMenu>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);

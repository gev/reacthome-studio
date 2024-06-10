
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

  setSetPointPalette = (palette_setpoint) => () => {
    this.props.change({ palette_setpoint });
  }

  setIntensityPalette = (palette_intensity) => () => {
    this.props.change({ palette_intensity });
  }

  render() {
    const { id, intensity, palette_setpoint, palette_intensity } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td><div className="paper">Setpoint palette</div></td>
            <td>
              <div className="paper">
                <SimpleMenu handle={<Button>{palette_setpoint || `None`}</Button>}>
                  {
                    (new Array(13)).fill(0).map((v, i) => (
                      <MenuItem key={`${id}/palette_setpoint/${i}`} index={i} onClick={this.setSetPointPalette(i)}>{i || `None`}</MenuItem>
                    ))
                  }
                </SimpleMenu>
              </div>
            </td>
          </tr>
          {
            intensity && (
              <tr>
                <td><div className="paper">Setpoint palette</div></td>
                <td>
                  <div className="paper">
                    <SimpleMenu handle={<Button>{palette_intensity || `None`}</Button>}>
                      {
                        (new Array(13)).fill(0).map((v, i) => (
                          <MenuItem key={`${id}/palette_intensity/${i}`} index={i} onClick={this.setIntensityPalette(i)}>{i || `None`}</MenuItem>
                        ))
                      }
                    </SimpleMenu>
                  </div>
                </td>
              </tr>
            )
          }
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

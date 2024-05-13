
import { Button } from '@rmwc/button';
import { MenuItem, SimpleMenu } from '@rmwc/menu';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../actions';


const MODE_COOL = "MODE_COOL";
const MODE_HEAT = "MODE_HEAT";
const MODE_WARM_FLOOR = "MODE_WARM_FLOOR";
const MODE_WET = "MODE_WET";
const MODE_VENTILATION = "MODE_VENTILATION";
const MODE_FAN = "MODE_FAN";
const MODE_SCENE = "MODE_SCENE";


const modes = [
  MODE_COOL,
  MODE_HEAT,
  MODE_WARM_FLOOR,
  MODE_VENTILATION,
  MODE_FAN,
  MODE_WET,
  MODE_SCENE
]

class Container extends Component {

  setMode = (mode) => () => {
    this.props.change({ mode });
  }

  setIndicator = (indicator) => () => {
    this.props.change({ indicator });
  }

  render() {
    const { id, mode, indicator = 0 } = this.props;
    return (
      <div>
        <div className="paper">
          <SimpleMenu handle={<Button>{mode || `None`}</Button>}>
            {
              modes.map((v) => (
                <MenuItem key={v} onClick={this.setMode(v)}>{v}</MenuItem>
              ))
            }
          </SimpleMenu>
        </div>
        <table>
          <tbody>
            <tr>
              <td><div className="paper">Indicator</div></td>
              <td>
                <div className="paper">
                  <SimpleMenu handle={<Button>{indicator || `None`}</Button>}>
                    {
                      (new Array(7)).fill(0).map((v, i) => (
                        <MenuItem key={`${id}/indicator/${i}`} index={i} onClick={this.setIndicator(i)}>{i || `None`}</MenuItem>
                      ))
                    }
                  </SimpleMenu>
                </div>
              </td>
              <td>
                <div className="paper">
                  {/* {
                    mode === MODE_SCENE ? (
                      <DI id={`${id}`} index={indicator} />
                    )
                  } */}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {
          mode === MODE_SCENE ? (
            <div></div>
          ) : (
            <div></div>
          )
        }
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);

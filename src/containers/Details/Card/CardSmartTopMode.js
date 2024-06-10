
import { Button } from '@rmwc/button';
import { MenuItem, SimpleMenu } from '@rmwc/menu';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../actions';
import SelectSite from '../SelectSite';
import CardSmartTopModeMinMaxSetpoint from './CardSmartTopModeMinMaxSetpoint';
import CardSmartTopModeScene from './CardSmartTopModeScene';
import CardSmartTopModeSetpoint from './CardSmartTopModeSetpoint';


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

  setPalette = (palette) => () => {
    this.props.change({ palette });
  }

  setSite = (site) => {
    this.props.change({ site });
  }

  render() {
    const { id, mode, site, palette = 0, indicator = 0, button, project } = this.props;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="paper">
                  <SimpleMenu handle={<Button>{mode || `None`}</Button>}>
                    {
                      modes.map((v) => (
                        <MenuItem key={v} onClick={this.setMode(v)}>{v}</MenuItem>
                      ))
                    }
                  </SimpleMenu>
                </div>
              </td>
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
              <td><div className="paper">Palette</div></td>
              <td>
                <div className="paper">
                  <SimpleMenu handle={<Button>{palette || `None`}</Button>}>
                    {
                      (new Array(13)).fill(0).map((v, i) => (
                        <MenuItem key={`${id}/palette/${i}`} index={i} onClick={this.setPalette(i)}>{i || `None`}</MenuItem>
                      ))
                    }
                  </SimpleMenu>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {
          mode !== MODE_SCENE && (
            <table>
              <tbody>
                <tr>
                  <td><div className="paper">Site</div></td>
                  <td>
                    <div className="paper">
                      <SelectSite id={site} project={project} onSelect={this.setSite} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          )
        }
        {
          (mode === MODE_COOL || mode === MODE_HEAT || mode === MODE_VENTILATION) && (
            <CardSmartTopModeSetpoint id={id} intensity />
          )
        }
        {
          mode === MODE_WET && (
            <CardSmartTopModeSetpoint id={id} />
          )
        }
        {
          mode === MODE_WARM_FLOOR && (
            <CardSmartTopModeMinMaxSetpoint id={id} />
          )
        }
        {
          mode === MODE_SCENE && (
            <CardSmartTopModeScene id={id} button={button} project={project} />
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

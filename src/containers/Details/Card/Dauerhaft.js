
import { Radio } from '@rmwc/radio';
import { Switch } from '@rmwc/switch';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../actions';
import Slider from '../../../components/Slider';
import { ACTION_SETPOINT, ACTION_SET, CODE, TITLE } from '../../../constants';
import { send } from '../../../websocket/peer';
import { Button, ButtonIcon, IconButton } from 'rmwc';

const Check = ({ checked, onChange, label }) => (
  <td>
    <div><Typography use="caption">{label}</Typography></div>
    <div><Radio checked={checked} onChange={onChange} /></div>
  </td>
);

class Container extends Component {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  select = (bind) => {
    const { id } = this.props;
    this.props.makeBind(id, bind);
  }
  setPoint = ({ detail: { value } }) => {
    const { id, daemon, index } = this.props;
    send(daemon, { id, type: ACTION_SETPOINT, index, value });
  };

  render() {
    const {
      code, title, setpoint, index, curtainChannel = 1
    } = this.props;
    return (
      <div>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <table>
          <tbody>
            <tr>
              <td className="paper">
                <TextField value={index}  label="ID" type="number" />
              </td>
              <td className="paper">
                <TextField value={curtainChannel} label="Channel" type="number"/>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td className="paper">
                <Button>
                  Up
                </Button>
              </td>
              <td className="paper">
                <Button>
                  Stop
                </Button>
              </td>
              <td className="paper">
                <Button>
                  Down
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="paper">
          <Typography>Set point</Typography>
          <Slider
            label="setpoint"
            min={0}
            step={1}
            max={100}
            value={setpoint || 0}
            onInput={this.setPoint}
            discrete
          />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id, index }) => pool[`${id}/curtain/${index}`] || {},
  (dispatch, { id, index }) => bindActionCreators({
    change: (payload) => modify(`${id}/curtain/${index}`, payload),
  }, dispatch)
)(Container);

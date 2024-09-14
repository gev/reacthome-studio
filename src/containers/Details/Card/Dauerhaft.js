
import { Radio } from '@rmwc/radio';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'rmwc';
import { modify } from '../../../actions';
import DangerButton from '../../../components/DangerButton';
import Slider from '../../../components/Slider';
import { ACTION_DELETE_ADDRESS, ACTION_DOWN, ACTION_LEARN, ACTION_LIMIT_DOWN, ACTION_LIMIT_UP, ACTION_SET, ACTION_SET_ADDRESS, ACTION_SET_POSITION, ACTION_STOP, ACTION_UP, CODE, TITLE } from '../../../constants';
import { send } from '../../../websocket/peer';

const Check = ({ checked, onChange, label }) => (
  <td>
    <div><Typography use="caption">{label}</Typography></div>
    <div><Radio checked={checked} onChange={onChange} /></div>
  </td>
);

class Container extends Component {
  componentDidMount() {
    const { address, channel } = this.props;
    this.setState({ address, channel });
  }

  componentWillReceiveProps({ address, channel }) {
    this.setState({ address, channel });
  }

  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  select = (bind) => {
    const { id } = this.props;
    this.props.makeBind(id, bind);
  }
  setPosition = ({ detail: { value } }) => {
    const { id, daemon, index } = this.props;
    send(daemon, { id, type: ACTION_SET_POSITION, index, position: value });
  };

  setAddress = () => {
    const { id, daemon, index, address, channel } = this.props;
    send(daemon, { id, type: ACTION_SET_ADDRESS, index, address, channel });
  }

  setAddr = ({ target: { value } }) => {
    let address = parseInt(value, 10);
    if (address < 1) address = 1;
    if (address > 99) address = 99;
    const { id, daemon, index } = this.props;
    const ch = `${id}/curtain/${index}`;
    send(daemon, { type: ACTION_SET, id: ch, payload: { address } });
  }

  seCh = ({ target: { value } }) => {
    let channel = parseInt(value, 10);
    if (channel < 1) channel = 1;
    if (channel > 16) channel = 16;
    const { id, daemon, index } = this.props;
    const ch = `${id}/curtain/${index}`;
    send(daemon, { type: ACTION_SET, id: ch, payload: { channel } });
  }

  up = () => {
    const { id, daemon, index } = this.props;
    send(daemon, { id, type: ACTION_UP, index });
  }

  down = () => {
    const { id, daemon, index } = this.props;
    send(daemon, { id, type: ACTION_DOWN, index });
  }

  stop = () => {
    const { id, daemon, index } = this.props;
    send(daemon, { id, type: ACTION_STOP, index });
  }

  limitUp = () => {
    const { id, daemon, index } = this.props;
    send(daemon, { id, type: ACTION_LIMIT_UP, index });
  }

  limitDown = () => {
    const { id, daemon, index } = this.props;
    send(daemon, { id, type: ACTION_LIMIT_DOWN, index });
  }

  learn = () => {
    const { id, daemon, index } = this.props;
    send(daemon, { id, type: ACTION_LEARN, index });
  }

  deleteAddress = () => {
    const { id, daemon, index } = this.props;
    send(daemon, { id, type: ACTION_DELETE_ADDRESS, index });
  }


  render() {
    const { code, title, index, position, value, address = index, channel = 1 } = this.props;
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
                <TextField value={address} label="ID" type="number" onChange={this.setAddr} />
              </td>
              <td className="paper">
                <TextField value={channel} label="Channel" type="number" onChange={this.seCh} />
              </td>
              <td className="paper">
                <DangerButton
                  label="Set"
                  message={`Set Address ${address}/${channel}`}
                  detail="Will be setup to the all devices on this bus"
                  onClick={this.setAddress} />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td className="paper">
                <Button onClick={this.up}>Up</Button>
              </td>
              <td className="paper">
                <Button onClick={this.stop}>Stop</Button>
              </td>
              <td className="paper">
                <Button onClick={this.down}>Down</Button>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td className="paper">
                <DangerButton
                  label="Limit Down"
                  message="Limit Down"
                  detail={`Limit lower position for the device ${address}/${channel}?`}
                  onClick={this.limitDown}
                />
              </td>
              <td className="paper">
                <DangerButton
                  label="Limit Up"
                  message="Limit Up"
                  detail={`Limit upper position for the device ${address}/${channel}?`}
                  onClick={this.limitUp}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td className="paper">
                <DangerButton
                  label="Learn"
                  message="Learn"
                  detail={`Enter to the learn mode for the device ${address}/${channel}`}
                  onClick={this.learn}
                />
              </td>
              <td className="paper">
                <DangerButton
                  label="Delete"
                  message="Delete address"
                  detail={`Delete address and channel for the device ${address}/${channel}`}
                  onClick={this.deleteAddress}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <span className="paper">
            <Typography>Current position</Typography>
          </span>
          <span className="paper">
            <Typography use="headline4">{value}</Typography>
          </span>
        </div>
        <div className="paper">
          <Slider
            label="Set position"
            min={0}
            step={1}
            max={100}
            value={position || 0}
            onInput={this.setPosition}
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

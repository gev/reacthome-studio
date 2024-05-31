
import {
  Card,
  CardAction,
  CardActionButtons,
  CardActionIcons,
  CardActions
} from '@rmwc/card';
import { Icon } from '@rmwc/icon';
import { LinearProgress } from '@rmwc/linear-progress';
import { MenuItem, SimpleMenu } from '@rmwc/menu';
import { Switch } from '@rmwc/switch';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { modify, remove, request } from '../../actions';
import CardActionRemove from '../../components/CardActionRemove';
import {
  ACTION_BOOTLOAD,
  ACTION_FIND_ME,
  CODE,
  DEVICE,
  DEVICE_TYPES,
  DEVICE_TYPE_BOOTLOADER
} from '../../constants';
import Device from './Device';

class Devices extends Component {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  setNewFirmware = (event) => {
    this.props.setNewFirmware(event.target.value);
  }

  updateFirmware = (newFirmware) => () => {
    this.props.updateFirmware(newFirmware);
  }

  findMe = event => {
    this.props.findMe(event.target.checked);
  }

  render() {
    const {
      timestamp, protocol,
      id, code, ip, address, type, version,
      removeDevice, pendingFirmware,
      ready = false,
      online = false,
      finding = false,
      pending = false,
      updating = false
    } = this.props;
    const date = new Date(timestamp);
    const { title, hasFindMeAction = false } = DEVICE_TYPES[type] || {};
    return (
      <Card className={!online && 'offline'}>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="paper">
                  <div>
                    <Typography use="title">{title || type || protocol || 'Unknown'}</Typography>
                  </div>
                  <div>
                    <Typography use="caption">{`${id} / ${ip || address} / v${version || '?'}`}</Typography>
                  </div>
                  <div>
                    <Typography use="caption">{timestamp && `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</Typography>
                  </div>
                </div>
              </td>
              <td>
                <div className="paper" style={{ textAlign: 'right' }}>
                  <TextField id={CODE} value={code || ''} onChange={this.change} placeholder="Code" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {
          updating && (
            <div className="paper">
              <LinearProgress determinate={false} />
            </div>
          )
        }
        {
          pending && !updating && (
            <div className="paper">
              <Typography use="caption">Pending update firmware <strong>{pendingFirmware}</strong></Typography>
            </div>
          )
        }
        <Device {...this.props} />
        <CardActions>
          <CardActionButtons>
            {
              type === DEVICE_TYPE_BOOTLOADER ? (
                <SimpleMenu handle={<CardAction>Firmware</CardAction>}>
                  {
                    Object
                      .entries(DEVICE_TYPES)
                      .filter(([i, v]) => (
                        (String(DEVICE_TYPE_BOOTLOADER) !== i) && v.firmware))
                      .map(([i, v]) => (
                        <MenuItem key={`${id}/firmware/${i}`} onClick={this.updateFirmware(v.firmware)}>
                          {
                            v.firmware
                          }
                        </MenuItem>
                      ))
                  }
                </SimpleMenu>
              ) : (
                (DEVICE_TYPES[type] || {}).firmware && (
                  <CardAction onClick={this.updateFirmware((DEVICE_TYPES[type] || {}).firmware)}>
                    Update
                  </CardAction>
                )
              )
            }
            {
              !ready && (
                <Icon icon="warning" />
              )
            }
          </CardActionButtons>
          <CardActionIcons>
            {
              hasFindMeAction && (
                <Switch
                  checked={!!finding}
                  disabled={!online}
                  onChange={this.findMe}
                  color="secondary"
                />
              )
            }
            <CardActionRemove remove={removeDevice} />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  createSelector(
    ({ pool }, { id }) => pool[id] || {},
    (_, props) => props,
    (o, { daemon }) => ({ ...o, daemon })
  ),
  (dispatch, { id, daemon }) => bindActionCreators({
    findMe: (finding) => request(daemon, { type: ACTION_FIND_ME, id, finding }),
    updateFirmware: (newFirmware) =>
      request(daemon, { id, type: ACTION_BOOTLOAD, pendingFirmware: newFirmware }),
    setNewFirmware: (newFirmware) => modify(id, { newFirmware }),
    removeDevice: () => remove(daemon, DEVICE, id),
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Devices);

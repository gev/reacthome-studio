
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons,
  CardActionButtons
} from '@rmwc/card';
import { Icon } from '@rmwc/icon';
import { Switch } from '@rmwc/switch';
import { LinearProgress } from '@rmwc/linear-progress';
import { SimpleMenu, MenuItem } from '@rmwc/menu';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import {
  CODE,
  DEVICE_TYPES,
  DEVICE_TYPE_BOOTLOADER,
  ACTION_FIND_ME,
  ACTION_BOOTLOAD,
  DEVICE,
  DEVICE_TYPE_DIM_8
} from '../../constants';
import { modify, remove, request } from '../../actions';
import Device from './Device';
import CardActionRemove from '../../components/CardActionRemove';

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
          {
            updating && (
              <div>
                <LinearProgress determinate={false} />
              </div>
            )
          }
          {
            pending && !updating && (
              <div>
                <Typography use="caption">Pending update firmware <strong>{pendingFirmware}</strong></Typography>
              </div>
            )
          }
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} placeholder="Code" fullwidth />
        </div>
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
                        <MenuItem key={i} onClick={this.updateFirmware(v.firmware)}>
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


import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons,
  CardActionButtons
} from 'rmwc/Card';
import { Icon } from 'rmwc/Icon';
import { Switch } from 'rmwc/Switch';
import { LinearProgress } from 'rmwc/LinearProgress';
import { SimpleMenu, MenuItem } from 'rmwc/Menu';
import { TextField } from 'rmwc/TextField';
import { Typography } from 'rmwc/Typography';
import {
  CODE,
  DEVICE_TYPES,
  DEVICE_TYPE_BOOTLOADER,
  ACTION_FIND_ME,
  ACTION_BOOTLOAD,
  DEVICE
} from '../../constants';
import { set, remove, request } from '../../actions';
import Device from './Device';

type Props = {
  id: string,
  ip: string,
  type: number,
  code: ?string,
  version: ?string,
  pendingFirmware: ?string,
  ready: ?boolean,
  online: ?boolean,
  finding: ?boolean,
  pending: ?boolean,
  updating: ?boolean,
  removeDevice: () => void,
  change: (payload: {}) => void,
  findMe: (finding: boolean) => void,
  updateFirmware: (firmware: string) => void,
  setNewFirmware: (id: string, firmware: string) => void,
};

class Devices extends Component<Props> {
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
      id, code, ip, type, version,
      removeDevice, pendingFirmware,
      ready = false,
      online = false,
      finding = false,
      pending = false,
      updating = false
    } = this.props;
    const { title, hasFindMeAction = false } = DEVICE_TYPES[type];
    return (
      <Card className={!online && 'offline'}>
        <div className="paper">
          <div>
            <Typography use="title">{title}</Typography>
          </div>
          <div>
            <Typography use="caption">{`${id} / ${ip} / v${version}`}</Typography>
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
        <div className="paper">
          <Device {...this.props} />
        </div>
        <CardActions>
          <CardActionButtons>
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
            {
              !ready && (
                <Icon use="warning" />
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
            <CardAction icon use="remove" onClick={removeDevice} />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id, daemon }) => bindActionCreators({
    findMe: (finding) => request(daemon, { type: ACTION_FIND_ME, id, finding }),
    updateFirmware: (newFirmware) =>
      request(daemon, { id, type: ACTION_BOOTLOAD, pendingFirmware: newFirmware }),
    setNewFirmware: (newFirmware) => set(id, { newFirmware }),
    removeDevice: () => remove(daemon, DEVICE, id),
    change: (payload) => set(id, payload),
  }, dispatch)
)(Devices);

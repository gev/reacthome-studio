
import React, { Component } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
  withStyles
} from 'material-ui';
import type { StyleRules } from 'material-ui';
import { Warning } from 'material-ui-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  DEVICE_TYPES,
  DEVICE_TYPE_BOOTLOADER,
  DEVICE_TYPE_DIM4,
  DEVICE_TYPE_DO8,
  DEVICE_TYPE_DOPPLER,
  ACTION_FIND_ME,
  ACTION_BOOTLOAD
} from '../constants';
import { set, request } from '../actions';
import Doppler from './Doppler';
import Dimmer from './Dimmer';
import Do from './Do';

const styles = (theme) => ({
  container: {
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'baseline',
    flexDirection: 'row'
  },
  control: {
    minWidth: 128
  },
  offline: {
    opacity: 0.5
  },
  inline: {
    display: 'inline',
    marginRight: theme.spacing.unit * 2
  },
  action: {
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 2
  }
});

type Props = {
  id: string,
  ip: string,
  type: number,
  name: string,
  state: any,
  version: ?string,
  hasFindMeAction: ?boolean,
  firmware: string,
  newFirmware: ?string,
  pendingFirmware: ?string,
  ready: ?boolean,
  online: ?boolean,
  finding: ?boolean,
  pending: ?boolean,
  updating: ?boolean,
  classes: StyleRules,
  setDeviceStatus: (id: string, status: string) => void,
  setNewFirmware: (id: string, firmware: string) => void,
};

class Devices extends Component<Props> {
  setNewFirmware = (event) => {
    this.props.setNewFirmware(event.target.value);
  }

  updateFirmware = () => {
    const { newFirmware, updateFirmware } = this.props;
    updateFirmware(newFirmware);
  }

  findMe = event => {
    this.props.findMe(event.target.checked);
  }

  content = () => {
    const {
      service, id, type, classes
    } = this.props;
    switch (type) {
      case DEVICE_TYPE_DOPPLER:
        return (
          <Doppler id={id} />
        );
      case DEVICE_TYPE_DIM4:
        return (
          <Grid container className={classes.container}>
            <Grid item xs={3}>
              <Dimmer service={service} id={id} index={1} />
            </Grid>
            <Grid item xs={3}>
              <Dimmer service={service} id={id} index={2} />
            </Grid>
            <Grid item xs={3}>
              <Dimmer service={service} id={id} index={3} />
            </Grid>
            <Grid item xs={3}>
              <Dimmer service={service} id={id} index={4} />
            </Grid>
          </Grid>
        );
      case DEVICE_TYPE_DO8:
        return (
          <Grid container className={classes.container}>
            <Grid item xs={3}>
              <Do service={service} id={id} index={1} />
            </Grid>
            <Grid item xs={3}>
              <Do service={service} id={id} index={2} />
            </Grid>
            <Grid item xs={3}>
              <Do service={service} id={id} index={3} />
            </Grid>
            <Grid item xs={3}>
              <Do service={service} id={id} index={4} />
            </Grid>
            <Grid item xs={3}>
              <Do service={service} id={id} index={5} />
            </Grid>
            <Grid item xs={3}>
              <Do service={service} id={id} index={6} />
            </Grid>
            <Grid item xs={3}>
              <Do service={service} id={id} index={7} />
            </Grid>
            <Grid item xs={3}>
              <Do service={service} id={id} index={8} />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  }

  render() {
    const {
      id, ip, type, version,
      newFirmware, pendingFirmware,
      ready = false,
      online = false,
      finding = false,
      pending = false,
      updating = false,
      classes
    } = this.props;
    const { name, hasFindMeAction = false, firmware } = DEVICE_TYPES[type];
    return (
      <Card className={!online ? classes.offline : ''}>
        <CardHeader
          title={name}
          subheader={`${id} / ${ip} / v${version}`}
          avatar={
            !ready ? (
              <Warning color="error" fontSize />
            ) : null
          }
          action={
            <div className={classes.container}>
              {
                hasFindMeAction ? (
                  <div className={classes.action}>
                    <InputLabel>Find me</InputLabel>
                    <Switch
                      checked={finding}
                      disabled={!online}
                      onChange={this.findMe}
                      color="secondary"
                    />
                  </div>
                ) : null
              }
              <div className={classes.action}>
                <FormControl className={classes.control}>
                  <InputLabel htmlFor="firmware">New firmware</InputLabel>
                  <Select
                    value={newFirmware || ''}
                    disabled={updating}
                    onChange={this.setNewFirmware}
                    inputProps={{ id: 'firmware' }}
                  > {
                      Object.entries(DEVICE_TYPES)
                        .filter(([i, v]) => (
                          (String(DEVICE_TYPE_BOOTLOADER) !== i) && v.firmware))
                        .map(([i, v]) => (
                          <MenuItem key={i} value={v.firmware}>{v.firmware}</MenuItem>
                        ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div className={classes.action}>
                {
                  updating ? (
                    <CircularProgress color="primary" />
                  ) : null
                }
                {
                  pending && !updating ? (
                    <Typography>
                      <small>Pending update firmware</small><br />
                      <strong>{pendingFirmware}</strong>
                    </Typography>
                  ) : null
                }
                {
                  newFirmware && !pending && !updating ? (
                    <Button variant="raised" onClick={this.updateFirmware} >Update</Button>
                  ) : null
                }
              </div>
            </div>
            }
        />
        <CardContent>
          {this.content()}
        </CardContent>
      </Card>
    );
  }
}

export default connect(
  (state, props) => props,
  (dispatch, { id, service }) => bindActionCreators({
    findMe: (finding) => request(service, { type: ACTION_FIND_ME, id, finding }),
    updateFirmware: (newFirmware) => request(service, { id, type: ACTION_BOOTLOAD, pendingFirmware: newFirmware }),
    setNewFirmware: (newFirmware) => set(id, { newFirmware })
  }, dispatch)
)(withStyles(styles)(Devices));

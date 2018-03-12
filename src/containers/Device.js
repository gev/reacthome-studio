
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
import { DEVICE_BOOTLOADER, DEVICE_TYPES, DEVICE_DIM4, DEVICE_DO8, DEVICE_DOPPLER } from '../constants';
import { setNewFirmware, setDeviceStatus } from '../actions';
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
  ready: ?boolean,
  offline: ?boolean,
  finding: ?boolean,
  pending: ?boolean,
  updating: ?boolean,
  classes: StyleRules,
  setDeviceStatus: (id: string, status: string) => void,
  setNewFirmware: (id: string, firmware: string) => void,
};

class Devices extends Component<Props> {
  setNewFirmware = (event) => {
    this.props.setNewFirmware(this.props.id, event.target.value);
  }

  updateFirmware = () => {
    this.props.setDeviceStatus(this.props.id, { pending: true });
  }

  findMe = event => {
    this.props.setDeviceStatus(this.props.id, { finding: event.target.checked });
  }

  content = () => {
    const {
      id, type, classes, state = {}
    } = this.props;
    switch (type) {
      case DEVICE_DOPPLER:
        return (
          <Doppler id={id} {...state} />
        );
      case DEVICE_DIM4:
        return (
          <Grid container className={classes.container}>
            <Grid item xs={3}>
              <Dimmer id={id} index={1} {...state[1]} />
            </Grid>
            <Grid item xs={3}>
              <Dimmer id={id} index={2} {...state[2]} />
            </Grid>
            <Grid item xs={3}>
              <Dimmer id={id} index={3} {...state[3]} />
            </Grid>
            <Grid item xs={3}>
              <Dimmer id={id} index={4} {...state[4]} />
            </Grid>
          </Grid>
        );
      case DEVICE_DO8:
        return (
          <Grid container className={classes.container}>
            <Grid item xs={3}>
              <Do id={id} index={1} {...state[1]} />
            </Grid>
            <Grid item xs={3}>
              <Do id={id} index={2} {...state[2]} />
            </Grid>
            <Grid item xs={3}>
              <Do id={id} index={3} {...state[3]} />
            </Grid>
            <Grid item xs={3}>
              <Do id={id} index={4} {...state[4]} />
            </Grid>
            <Grid item xs={3}>
              <Do id={id} index={5} {...state[5]} />
            </Grid>
            <Grid item xs={3}>
              <Do id={id} index={6} {...state[6]} />
            </Grid>
            <Grid item xs={3}>
              <Do id={id} index={7} {...state[7]} />
            </Grid>
            <Grid item xs={3}>
              <Do id={id} index={8} {...state[8]} />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  }

  render() {
    const {
      id, ip, name, version,
      firmware, newFirmware,
      ready = false,
      offline = false,
      finding = false,
      pending = false,
      updating = false,
      hasFindMeAction = false,
      classes
    } = this.props;
    return (
      <Card className={offline ? classes.offline : ''}>
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
                      disabled={offline}
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
                    value={newFirmware || firmware}
                    disabled={updating}
                    onChange={this.setNewFirmware}
                    inputProps={{ id: 'firmware' }}
                  > {
                      Object.entries(DEVICE_TYPES)
                        .filter(([i, v]) => (
                          (String(DEVICE_BOOTLOADER) !== i) && v.firmware))
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
                      <strong>{newFirmware}</strong>
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
  props => props,
  (dispatch) => bindActionCreators({
    setNewFirmware, setDeviceStatus
  }, dispatch)
)(withStyles(styles)(Devices));


import React, { Component } from 'react';
import {
  Grid,
  Typography,
  FormControl,
  Button,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  withStyles
} from 'material-ui';
import type { StyleRules } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BOOTLOADER, DEVICE_TYPES, UPDATING_FIRMWARE } from '../constants';
import { setNewFirmware, updateFirmware } from '../actions';

const styles = {
  container: {
    justifyItems: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  control: {
    minWidth: 128
  }
};

type Props = {
  id: string,
  ip: string,
  name: string,
  version: ?string,
  firmware: string,
  newFirmware: ?string,
  status: ?string,
  classes: StyleRules,
  setNewFirmware: (id: string, firmware: string) => void,
  updateFirmware: (id: string) => void
};

class Devices extends Component<Props> {
  setNewFirmware = (event) => {
    this.props.setNewFirmware(this.props.id, event.target.value);
  };

  updateFirmware = () => {
    this.props.updateFirmware(this.props.id);
  }

  render() {
    const {
      id, ip, name, version, firmware, newFirmware, status, classes
    } = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid item xs={2}>
          <Typography variant="headline">{name}</Typography>
        </Grid>
        <Grid item xs={1}>
          {
            version && (
              <Typography>v {version}</Typography>
            )
          }
        </Grid>
        <Grid item xs={2}>
          <Typography>{id}<br />{ip}</Typography>
        </Grid>
        {
          firmware && [
            <Grid key="firmware" item xs={2}>
              <Typography>Current firmware<br /><strong>{firmware}</strong></Typography>
            </Grid>,
            <Grid key="newFirmware" item xs={2}>
              <FormControl className={classes.control}>
                <InputLabel htmlFor="firmware">New firmware</InputLabel>
                <Select
                  value={newFirmware || firmware}
                  disabled={status === UPDATING_FIRMWARE}
                  onChange={this.setNewFirmware}
                  inputProps={{ id: 'firmware' }}
                > {
                    Object.entries(DEVICE_TYPES)
                      .filter(([i, v]) => (
                        (String(BOOTLOADER) !== i) && v.firmware))
                      .map(([i, v]) => (
                        <MenuItem key={i} value={v.firmware}>{v.firmware}</MenuItem>
                      ))
                  }
                </Select>
              </FormControl>
            </Grid>,
            status === UPDATING_FIRMWARE ? (
              <Grid key="status" item xs={1}>
                <CircularProgress color="primary" />
              </Grid>
            ) : (
              <Grid key="updateFirmware" item xs={1}>
                <Button variant="raised" onClick={this.updateFirmware} disabled={!newFirmware}>Update</Button>
              </Grid>
            )
          ]
        }
      </Grid>
    );
  }
}

export default connect(
  props => props,
  (dispatch) => bindActionCreators({ setNewFirmware, updateFirmware }, dispatch)
)(withStyles(styles)(Devices));

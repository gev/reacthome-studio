
import React, { Component } from 'react';
import { CircularProgress, MenuList, MenuItem, ListItemText, Typography, withStyles } from 'material-ui';
import { ChevronRight } from 'material-ui-icons';
import type { StyleRules } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DEVICE_TYPES } from '../constants';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

type Props = {
  devices: [],
  classes: StyleRules
};

class Devices extends Component<Props> {
  render() {
    const { devices, classes } = this.props;
    return (
      <div className={classes.container}>
        <div>
          <Typography component="h1" type="headline" align="center">Found Devices</Typography>
          {
            devices.length > 0
              ? (
                <MenuList>
                  {
                    devices.map(({ id, ip, type }) => (
                      <MenuItem key={id}>
                        <ListItemText
                          primary={DEVICE_TYPES[type]}
                          secondary={`${id} / ${ip}`}
                        />
                        <ChevronRight />
                      </MenuItem>
                    ))
                  }
                </MenuList>
              )
              : <CircularProgress size={100} color="primary" />
          }
        </div>
      </div>
    );
  }
}

export default connect(
  ({ devices }, props) => ({ ...props, devices }),
  (dispatch) => bindActionCreators({ }, dispatch)
)(withStyles(styles)(Devices));


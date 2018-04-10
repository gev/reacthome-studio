
import React, { Component } from 'react';
import { CircularProgress, withStyles } from 'material-ui';
import type { StyleRules } from 'material-ui';
import { connect } from 'react-redux';
import Device from './Device';
import { ROOT } from '../constants';

const styles = (theme) => ({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto'
  },
  item: {
    padding: theme.spacing.unit * 2
  }
});

type Props = {
  device: [],
  service: string,
  classes: StyleRules
};

class Devices extends Component<Props> {
  render() {
    const { service, device, classes } = this.props;
    return (
      <div className={classes.container}>
        {
          device.map(d => (
            <div key={d.id} className={classes.item}>
              <Device service={service} {...d} />
            </div>
          ))
        }
      </div>
    );
  }
}

export default connect(
  ({ pool }, { daemon }) =>
    ({ device: ((pool[daemon] || {}).device || []).map(id => ({ id, ...pool[id] })) })
)(withStyles(styles)(Devices));

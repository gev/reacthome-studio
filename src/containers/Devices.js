
import React, { Component } from 'react';
import { CircularProgress, withStyles } from 'material-ui';
import type { StyleRules } from 'material-ui';
import { connect } from 'react-redux';
import Device from './Device';

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
  device: {},
  classes: StyleRules
};

class Devices extends Component<Props> {
  render() {
    const { service, pool, classes } = this.props;
    return (
      <div className={classes.container}>
        {
          service.map(s => pool[s].device && pool[s].device.map(id => (
            <div key={id} className={classes.item}>
              <Device id={id} service={s} {...pool[id]} />
            </div>
          )))
        }
      </div>
    );
  }
}

export default connect(({ service, pool }, props) =>
  ({ ...props, service, pool }))(withStyles(styles)(Devices));

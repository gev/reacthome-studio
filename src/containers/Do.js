
import React, { Component } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Switch,
  Typography,
  withStyles
} from 'material-ui';
import type { StyleRules } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { request } from '../actions';
import { ACTION_DO } from '../constants';

const styles = {
  container: {
    display: 'flex',
    justifyItems: 'stretch',
    alignItems: 'center',
    flexDirection: 'row'
  }
};

type PropsType = {
  id: string,
  index: number,
  value: number,
  setDeviceState: (id: string, state: {}) => void,
  classes: StyleRules
};

class Do extends Component<PropsType> {
  setValue = (event) => {
    this.props.setValue(event.target.checked);
  }

  render() {
    const { index, value = 0, classes } = this.props;
    return (
      <Card>
        <CardHeader title={index} />
        <CardContent>
          <div className={classes.container}>
            <Switch
              checked={value}
              color="secondary"
              onChange={this.setValue}
            />
            <Typography variant="display3">
              {
                value ? 'On' : 'Off'
              }
            </Typography>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default connect(
  ({ pool }, props) => pool[`${props.id}.${props.index}`],
  (dispatch, { service, id, index }) => bindActionCreators({
    setValue: (value) => request(
      service,
      {
        id, type: ACTION_DO, index, value
      }
    )
  }, dispatch)
)(withStyles(styles)(Do));


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
import { setDeviceState } from '../actions';

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
    const { id, index } = this.props;
    this.props.setDeviceState(id, {
      [index]: { value: event.target.checked ? 1 : 0 }
    });
  }

  render() {
    const { index, value = 0, classes } = this.props;
    return (
      <Card>
        <CardHeader title={index} />
        <CardContent>
          <div className={classes.container}>
            <Switch
              checked={value !== 0}
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
  props => props,
  (dispatch) => bindActionCreators({ setDeviceState }, dispatch)
)(withStyles(styles)(Do));

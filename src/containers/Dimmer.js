
import React, { Component } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Typography,
  withStyles
} from 'material-ui';
import { MoreVert } from 'material-ui-icons';
import type { StyleRules } from 'material-ui';
import { Slider } from 'material-ui-old';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  DIM_TYPE_UNPLUGGED,
  DIM_TYPES,
  DIM_TYPE_RISING_EDGE,
  DIM_TYPE_FALLING_EDGE,
  DIM_TYPE_PWM,
  DIM_TYPE_RELAY
} from '../constants';
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
  type: ?number,
  setDeviceState: (id: string, state: {}) => void,
  classes: StyleRules
};

class Dimmer extends Component<PropsType> {
  state = { anchorEl: null };

  showMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  hideMenu = () => {
    this.setState({ anchorEl: null });
  };

  setType = (type) => () => {
    const { id, index, value } = this.props;
    this.props.setDeviceState(id, { [index]: { type, value } });
    this.hideMenu();
  };

  setValue = (event, value) => {
    const { id, index, type } = this.props;
    console.log(event.target.checked, value);
    this.props.setDeviceState(id, {
      [index]: { type, value: event.target.checked ? 255 : value || 0 }
    });
  }

  render() {
    const { anchorEl } = this.state;
    const {
      classes, index, value = 0, type = DIM_TYPE_UNPLUGGED
    } = this.props;
    return (
      <Card>
        <CardHeader
          title={index}
          subheader={DIM_TYPES[type]}
          action={
            <div>
              <IconButton onClick={this.showMenu}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.hideMenu}
              >
                {
                  DIM_TYPES.map((t, i) => (
                    <MenuItem key={t} value={i} selected={i === type} onClick={this.setType(i)}>
                      {t}
                    </MenuItem>
                  ))
                }
              </Menu>
            </div>
          }
        />
        {
          type !== DIM_TYPE_UNPLUGGED ? (
            <CardContent>
              <div className={classes.container}>
                <Switch
                  checked={value !== 0}
                  color="secondary"
                  onChange={this.setValue}
                />
                <Typography variant="display3">
                  {
                    type === DIM_TYPE_RELAY ? (
                      value ? 'On' : 'Off' 
                    ) : value
                  }
                </Typography>
              </div>
              {
                type === DIM_TYPE_RISING_EDGE ||
                type === DIM_TYPE_FALLING_EDGE ||
                type === DIM_TYPE_PWM ? (
                  <Slider min={0} max={255} value={value} step={1} onChange={this.setValue} />
                ) : null
              }
            </CardContent>
          ) : null
        }
      </Card>
    );
  }
}

export default connect(
  props => props,
  (dispatch) => bindActionCreators({ setDeviceState }, dispatch)
)(withStyles(styles)(Dimmer));

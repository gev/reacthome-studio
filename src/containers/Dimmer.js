
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
  ACTION_DIMMER,
  DIM_TYPE,
  DIM_TYPES,
  DIM_TYPE_UNPLUGGED,
  DIM_TYPE_RISING_EDGE,
  DIM_TYPE_FALLING_EDGE,
  DIM_TYPE_PWM,
  DIM_TYPE_RELAY,
  DIM_FADE
} from '../constants';
import { request } from '../actions';

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

  setType = (value) => () => {
    this.props.setType(value);
    this.hideMenu();
  };

  setValue = (event, value) => {
    this.props.setValue(event.target.checked ? 255 : value || 0);
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
                    <MenuItem key={t} selected={i === type} onClick={this.setType(i)}>
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
  ({ pool }, props) => pool[`${props.id}.${props.index}`],
  (dispatch, { service, id, index }) => bindActionCreators({
    setType: (value) => request(service, {
      id, index, type: ACTION_DIMMER, action: DIM_TYPE, value
    }),
    setValue: (value) => request(service, {
      id, index, type: ACTION_DIMMER, action: DIM_FADE, value, velocity: 128
    })
  }, dispatch)
)(withStyles(styles)(Dimmer));

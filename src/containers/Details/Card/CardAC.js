
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { get, remove, modify } from '../../../actions';
import {
  CODE,
  DEVICE_TYPE_DO12,
  DEVICE_TYPE_DO8,
  DEVICE_TYPE_IR1,
  DEVICE_TYPE_IR6,
  DEVICE_TYPE_IR_4,
  DEVICE_TYPE_LAN_AMP,
  DEVICE_TYPE_MIX_1,
  DEVICE_TYPE_MIX_1_RS,
  DEVICE_TYPE_MIX_2,
  DEVICE_TYPE_PLC,
  DEVICE_TYPE_RELAY_12,
  DEVICE_TYPE_RELAY_12_RS,
  DEVICE_TYPE_RELAY_2,
  DEVICE_TYPE_RELAY_24,
  DEVICE_TYPE_RELAY_2_DIN,
  DEVICE_TYPE_RELAY_6,
  DEVICE_TYPE_SMART_4A,
  DEVICE_TYPE_SMART_4AM,
  DEVICE_TYPE_SMART_4G,
  DEVICE_TYPE_SMART_4GD,
  DRIVER_TYPE_BB_PLC1,
  DRIVER_TYPE_BB_PLC2,
  TITLE
} from '../../../constants';
import SelectThermostat from './SelectThermostat';
import Autocomplete from '../../Filter';
import CardACIR from './CardACIR';
import CardACDo from './CardACDo';


class Container extends Component {
  state = {}
  componentDidMount() {
    const [bind] = (this.props.bind || '').split('/');
    if (bind) {
      this.setState({ bind });
    }
  }
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  select = (bind) => {
    this.setState({ bind });
  }
  render() {
    const { bind } = this.state;
    const {
      code, project, title, removeField, id, get
    } = this.props;
    const { type } = bind ? get(bind) : {};
    switch (type) {
      case DEVICE_TYPE_IR1:
      case DEVICE_TYPE_IR_4:
      case DEVICE_TYPE_SMART_4A:
      case DEVICE_TYPE_SMART_4AM:
      case DEVICE_TYPE_SMART_4G:
      case DEVICE_TYPE_SMART_4GD:
      case DEVICE_TYPE_LAN_AMP:
      case DEVICE_TYPE_IR6:
        return <CardACIR {...this.props} device={bind} />
      case DEVICE_TYPE_RELAY_2:
      case DEVICE_TYPE_RELAY_2_DIN:
      case DEVICE_TYPE_RELAY_6:
      case DEVICE_TYPE_MIX_1:
      case DEVICE_TYPE_MIX_1_RS:
      case DEVICE_TYPE_MIX_2:
      case DEVICE_TYPE_RELAY_12:
      case DEVICE_TYPE_RELAY_12_RS:
      case DEVICE_TYPE_RELAY_24:
      case DEVICE_TYPE_PLC:
      case DRIVER_TYPE_BB_PLC1:
      case DRIVER_TYPE_BB_PLC2:
      case DEVICE_TYPE_DO8:
      case DEVICE_TYPE_DO12:
        return <CardACDo {...this.props} device={bind} />
      default:
        return (
          <Card>
            <div className="paper">
              <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
            </div>
            <div className="paper">
              <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
            </div>
            <div className="paper">
              <SelectThermostat id={id} root={project} />
            </div>
            <div className="paper">
              <Autocomplete root={project} onSelect={this.select} />
            </div>
            <CardActions>
              <CardActionIcons>
                <CardAction icon="remove" onClick={removeField} />
              </CardActionIcons>
            </CardActions>
          </Card>
        );
    }
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, {
    parent, id, field, multiple,
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    change: (payload) => modify(id, payload),
    get
  }, dispatch)
)(Container);

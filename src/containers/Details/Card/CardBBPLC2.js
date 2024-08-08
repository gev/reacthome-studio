
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons,
  CardActionButtons
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { TITLE, CODE } from '../../../constants';
import { remove, modify } from '../../../actions';
import DeviceValueChannel from '../../Device/DeviceValueChannel';
import Do from '../../Device/DeviceDoChannel';
import SelectThermostat from './SelectThermostat';
import SelectWaterCounter from './SelectWaterCounter';
import CardActionRemove from '../../../components/CardActionRemove';


const RowDo = ({ id, daemon, index }) => (
  <tr>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 0} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 1} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 2} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 3} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 4} /></td>
  </tr>
);

const RowValue = ({ label, children }) => (
  <tr>
    <td>
      <Typography use="caption">{label}</Typography>
    </td>
    <td>{children}</td>
  </tr>
);

class Container extends Component {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  changeInt = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: parseInt(value, 10) });
  }

  channel = (channel) => `${this.props.id}/channel/${channel}`;

  render() {
    const {
      id, daemon, project,
      title, code, host, port = 502,
      removeField
    } = this.props;
    return (
      <Card>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <div className="paper">
          <TextField id="host" value={host} label="host" type="text" onChange={this.change} />
          <TextField id="port" value={port} label="port" type="number" onChange={this.changeInt} />
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowDo id={id} daemon={daemon} index={1} />
              <RowDo id={id} daemon={daemon} index={6} />
              <RowDo id={id} daemon={daemon} index={11} />
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="water_counter_1">
                <DeviceValueChannel id={this.channel('water_counter_1')} />
                <SelectWaterCounter root={project} id={this.channel('water_counter_1')} />
              </RowValue>
              <RowValue label="water_counter_2">
                <DeviceValueChannel id={this.channel('water_counter_2')} />
                <SelectWaterCounter root={project} id={this.channel('water_counter_2')} />
              </RowValue>
              <RowValue label="water_counter_3">
                <DeviceValueChannel id={this.channel('water_counter_3')} />
                <SelectWaterCounter root={project} id={this.channel('water_counter_3')} />
              </RowValue>
              <RowValue label="water_counter_4">
                <DeviceValueChannel id={this.channel('water_counter_4')} />
                <SelectWaterCounter root={project} id={this.channel('water_counter_4')} />
              </RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="vent_fan_speed"><DeviceValueChannel id={this.channel('vent_fan_speed')} /></RowValue>
              <RowValue label="vent_damper"><DeviceValueChannel id={this.channel('vent_damper')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="acc1_mode"><DeviceValueChannel id={this.channel('acc1_mode')} /></RowValue>
              <RowValue label="acc1_fan_speed"><DeviceValueChannel id={this.channel('acc1_fan_speed')} /></RowValue>
              <RowValue label="acc1_vane_position"><DeviceValueChannel id={this.channel('acc1_vane_position')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="acc2_mode"><DeviceValueChannel id={this.channel('acc2_mode')} /></RowValue>
              <RowValue label="acc2_fan_speed"><DeviceValueChannel id={this.channel('acc2_fan_speed')} /></RowValue>
              <RowValue label="acc2_vane_position"><DeviceValueChannel id={this.channel('acc2_vane_position')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="acc3_mode"><DeviceValueChannel id={this.channel('acc3_mode')} /></RowValue>
              <RowValue label="acc3_fan_speed"><DeviceValueChannel id={this.channel('acc3_fan_speed')} /></RowValue>
              <RowValue label="acc3_vane_position"><DeviceValueChannel id={this.channel('acc3_vane_position')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="acc4_mode"><DeviceValueChannel id={this.channel('acc4_mode')} /></RowValue>
              <RowValue label="acc4_fan_speed"><DeviceValueChannel id={this.channel('acc4_fan_speed')} /></RowValue>
              <RowValue label="acc4_vane_position"><DeviceValueChannel id={this.channel('acc4_vane_position')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="t1_air_temperature"><DeviceValueChannel id={this.channel('t1_air_temperature')} /></RowValue>
              <RowValue label="t1_humidity"><DeviceValueChannel id={this.channel('t1_humidity')} /></RowValue>
              <RowValue label="t1_floor_temperature"><DeviceValueChannel id={this.channel('t1_floor_temperature')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="t2_air_temperature"><DeviceValueChannel id={this.channel('t2_air_temperature')} /></RowValue>
              <RowValue label="t2_humidity"><DeviceValueChannel id={this.channel('t2_humidity')} /></RowValue>
              <RowValue label="t2_floor_temperature"><DeviceValueChannel id={this.channel('t2_floor_temperature')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="t3_air_temperature"><DeviceValueChannel id={this.channel('t3_air_temperature')} /></RowValue>
              <RowValue label="t3_humidity"><DeviceValueChannel id={this.channel('t3_humidity')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="t4_air_temperature"><DeviceValueChannel id={this.channel('t4_air_temperature')} /></RowValue>
              <RowValue label="t4_humidity"><DeviceValueChannel id={this.channel('t4_humidity')} /></RowValue>
              <RowValue label="t4_floor_temperature"><DeviceValueChannel id={this.channel('t4_floor_temperature')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="t5_air_temperature"><DeviceValueChannel id={this.channel('t5_air_temperature')} /></RowValue>
              <RowValue label="t5_humidity"><DeviceValueChannel id={this.channel('t5_humidity')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="t6_air_temperature"><DeviceValueChannel id={this.channel('t6_air_temperature')} /></RowValue>
              <RowValue label="t6_humidity"><DeviceValueChannel id={this.channel('t6_humidity')} /></RowValue>
              <RowValue label="t6_floor_temperature"><DeviceValueChannel id={this.channel('t6_floor_temperature')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="t7_air_temperature"><DeviceValueChannel id={this.channel('t7_air_temperature')} /></RowValue>
              <RowValue label="t7_humidity"><DeviceValueChannel id={this.channel('t7_humidity')} /></RowValue>
              <RowValue label="t7_floor_temperature"><DeviceValueChannel id={this.channel('t7_floor_temperature')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="t8_air_temperature"><DeviceValueChannel id={this.channel('t8_air_temperature')} /></RowValue>
              <RowValue label="t8_humidity"><DeviceValueChannel id={this.channel('t8_humidity')} /></RowValue>
              <RowValue label="t8_floor_temperature"><DeviceValueChannel id={this.channel('t8_floor_temperature')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="voltage_phase_a"><DeviceValueChannel id={this.channel('voltage_phase_a')} /></RowValue>
              <RowValue label="voltage_phase_b"><DeviceValueChannel id={this.channel('voltage_phase_b')} /></RowValue>
              <RowValue label="voltage_phase_c"><DeviceValueChannel id={this.channel('voltage_phase_c')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="current_phase_a"><DeviceValueChannel id={this.channel('current_phase_a')} /></RowValue>
              <RowValue label="current_phase_b"><DeviceValueChannel id={this.channel('current_phase_b')} /></RowValue>
              <RowValue label="current_phase_c"><DeviceValueChannel id={this.channel('current_phase_c')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="power_phase_a"><DeviceValueChannel id={this.channel('power_phase_a')} /></RowValue>
              <RowValue label="power_phase_b"><DeviceValueChannel id={this.channel('power_phase_b')} /></RowValue>
              <RowValue label="power_phase_c"><DeviceValueChannel id={this.channel('power_phase_c')} /></RowValue>
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowValue label="room1_set_point">
                <DeviceValueChannel id={this.channel('room1_set_point')} />
                <SelectThermostat root={project} id={this.channel('room1_set_point')} />
              </RowValue>
              <RowValue label="room2_set_point">
                <DeviceValueChannel id={this.channel('room2_set_point')} />
                <SelectThermostat root={project} id={this.channel('room2_set_point')} />
              </RowValue>
              <RowValue label="room3_set_point">
                <DeviceValueChannel id={this.channel('room3_set_point')} />
                <SelectThermostat root={project} id={this.channel('room3_set_point')} />
              </RowValue>
              <RowValue label="room4_set_point">
                <DeviceValueChannel id={this.channel('room4_set_point')} />
                <SelectThermostat root={project} id={this.channel('room4_set_point')} />
              </RowValue>
              <RowValue label="room5_set_point">
                <DeviceValueChannel id={this.channel('room5_set_point')} />
                <SelectThermostat root={project} id={this.channel('room5_set_point')} />
              </RowValue>
              <RowValue label="room6_set_point">
                <DeviceValueChannel id={this.channel('room6_set_point')} />
                <SelectThermostat root={project} id={this.channel('room6_set_point')} />
              </RowValue>
              <RowValue label="room7_set_point">
                <DeviceValueChannel id={this.channel('room7_set_point')} />
                <SelectThermostat root={project} id={this.channel('room7_set_point')} />
              </RowValue>
              <RowValue label="room8_set_point">
                <DeviceValueChannel id={this.channel('room8_set_point')} />
                <SelectThermostat root={project} id={this.channel('room8_set_point')} />
              </RowValue>
            </tbody>
          </table>
        </div>
        <CardActions>
          <CardActionIcons>
            <CardActionRemove remove={removeField} />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, {
    project, parent, id, field, multiple
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);

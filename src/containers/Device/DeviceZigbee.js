
import { Icon } from '@rmwc/icon';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { ACTION_MOVE_TO_HUE, ACTION_MOVE_TO_LEVEL, ACTION_MOVE_TO_SATURATION, ACTION_SETPOINT, ALARM, CLOSURE, COLOR, DO, HUMIDITY, ILLUMINATION, LEVEL, TEMPERATURE, THERMOSTAT } from '../../constants';
import Closure from './DeviceClosureEndpoint';
import Do from './DeviceDo';
import DoEndpoint from './DeviceDoEndpoint';
import Slider from './DeviceSlider';
import SliderEndpoint from './DeviceSliderEndpoint';

const Row = ({ title, value, magnitude }) => (
  <table>
    <tbody>
      <tr>
        <td className="paper">
          <Typography use="body">{title}</Typography>
        </td>
        <td className="paper">
          <Typography use="body">{`${typeof value === 'number' ? value.toFixed(2) : value} ${magnitude}`}</Typography>
        </td>
      </tr>
    </tbody>
  </table>
);

export default class extends Component {
  render() {
    const { id, daemon, endpoint = [] } = this.props;
    return endpoint.map(e => (
      <div key={e.id} className="paper">
        <div><Typography use="caption">{e.id}</Typography></div>
        {
          e.cluster.map(key => {
            switch (key) {
              case DO: return (
                <DoEndpoint key={key} id={id} daemon={daemon} index={e.id} />
              );
              case CLOSURE: return (
                <Closure key={key} id={id} daemon={daemon} index={e.id} />
              );
              case TEMPERATURE: return (
                <Row key={key} title="Temperature" value={this.props.temperature} magnitude="°C" />
              );
              case HUMIDITY: return (
                <Row key={key} title="Humidity" value={this.props.humidity} magnitude="%" />
              );
              case ILLUMINATION: return (
                <Row key={key} title="Illumination" value={this.props.illumination} magnitude="lux" />
              );
              case ALARM: {
                return (
                  <div key={key} className="paper">
                    <Icon icon="warning" iconOptions={{ size: 'xlarge' }} style={{ opacity: this.props.value ? 1 : 0.2 }} />
                  </div>
                );
              }
              case LEVEL: return (
                <SliderEndpoint key={key} id={id} daemon={daemon} index={e.id} action={ACTION_MOVE_TO_LEVEL} val="level" caption="Level" discrete />
              );
              case COLOR: return (
                <div key={key}>
                  <SliderEndpoint id={id} daemon={daemon} index={e.id} action={ACTION_MOVE_TO_HUE} val="hue" caption="Hue" discrete />
                  <SliderEndpoint id={id} daemon={daemon} index={e.id} action={ACTION_MOVE_TO_SATURATION} val="saturation" caption="Saturation" discrete />
                </div>
              );
              case THERMOSTAT: return [
                <Row key="temp" title="Temperature" value={this.props.temperature} magnitude="°C" />,
                <div key="setpoint">
                  <Slider label="setpoint" id={id} daemon={daemon} min={5} max={30} action={ACTION_SETPOINT} val="setpoint" caption="Setpoint" />
                  <Do id={id} daemon={daemon} />
                </div>
              ];
              default: return null;
            }
          })
        }
      </div>
    ));
  }
}

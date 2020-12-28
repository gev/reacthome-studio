
import React, { Component } from 'react';
import { Typography } from '@rmwc/typography';
import { Icon } from '@rmwc/icon';
import DoEndpoint from './DeviceDoEndpoint';
import Do from './DeviceDo';
import Closure from './DeviceClosureEndpoint';
import SliderEndpoint from './DeviceSliderEndpoint';
import Slider from './DeviceSlider';
import { DO, TEMPERATURE, HUMIDITY, ILLUMINATION, ALARM, LEVEL, COLOR, ACTION_MOVE_TO_HUE, ACTION_MOVE_TO_SATURATION, ACTION_MOVE_TO_LEVEL, CLOSURE, THERMOSTAT, ACTION_SETPOINT } from '../../constants';

type Props = {
  id: string;
  daemon: string;
  config: {};
};

const Row = ({ title, value, magnitude }: RowProps) => (
  <table>
    <tbody>
      <tr>
        <td className="paper">
          <Typography use="body">{title}</Typography>
        </td>
        <td className="paper">
          <Typography use="body">{`${value} ${magnitude}`}</Typography>
        </td>
      </tr>
    </tbody>
  </table>
);

export default class extends Component<Props> {
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
                <SliderEndpoint key={key} id={id} daemon={daemon} index={e.id} type={ACTION_MOVE_TO_LEVEL} val="level" caption="Level" />
              );
              case COLOR: return (
                <div key={key}>
                  <SliderEndpoint id={id} daemon={daemon} index={e.id} type={ACTION_MOVE_TO_HUE} val="hue" caption="Hue" />
                  <SliderEndpoint id={id} daemon={daemon} index={e.id} type={ACTION_MOVE_TO_SATURATION} val="saturation" caption="Saturation" />
                </div>
              );
              case THERMOSTAT: return (
                <div key={key}>
                  <Slider id={id} daemon={daemon} index={e.id} min={5} max={30} type={ACTION_SETPOINT} val="setpoint" caption="Setpoint" />
                  <Do id={id} daemon={daemon} index={e.id} />
                </div>
              );
              default: return null;
            }
          })
        }
      </div>
    ));
  }
}

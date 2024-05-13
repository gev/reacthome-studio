
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { onHumidity, onTemperature } from '../../../constants';
import SelectScript from '../SelectScript';


const Row = ({
  title, value, magnitude, project, script, onSelect, onRemove
}) => (
  <tr>
    <td className="paper">
      <Typography use="body">{title}</Typography>
    </td>
    <td className="paper">
      <Typography use="body">{value}{magnitude}</Typography>
    </td>
    <td>
      {
        script &&
        <Typography use="caption" onClick={onRemove}><strong> X </strong></Typography>
      }
    </td>
    <td className='paper'>
      <SelectScript id={script} project={project} onSelect={onSelect} />
    </td>
  </tr>
);

export default class extends Component {

  select = (on) => (id) => {
    this.props.change({ [on]: id });
  }

  remove = (on) => () => {
    this.props.change({ [on]: null });
  }

  render() {
    const { project, temperature, humidity } = this.props;
    return (
      <table style={{ textAlign: 'left' }}>
        <tbody>
          <Row
            title="Temperature"
            value={temperature}
            magnitude="°C"
            script={this.props.onTemperature}
            onSelect={this.select(onTemperature)}
            onRemove={this.remove(onTemperature)}
            project={project}
          />
          <Row
            title="Humidity"
            value={humidity}
            magnitude="%"
            script={this.props.onHumidity}
            onSelect={this.select(onHumidity)}
            onRemove={this.remove(onHumidity)}
            project={project}
          />
        </tbody>
      </table>
    );
  }
}

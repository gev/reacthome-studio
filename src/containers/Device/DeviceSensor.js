
import React, { Component } from 'react';
import { Typography } from '@rmwc/typography';
import DeviceDoppler from './DeviceDoppler';
import Di from './DeviceDiChannel';
import RGB from '../RGB';
import Display from '../Display';
import Slider from '@rmwc/slider';
import { send } from '../../websocket/peer';
import { ACTION_TEMPERATURE_CORRECT, ACTION_VIBRO } from '../../constants';

type Props = {
  temperature: ?number;
  humidity: ?number;
  daemon: string;
  id: string;
};

type RowProps = {
  title: string;
  value: any;
  magnitude: ?string;
};

const Row = ({ title, value, magnitude }: RowProps) => (
  <tr>
    <td className="paper">
      <Typography use="body">{title}</Typography>
    </td>
    <td className="paper">
      <Typography use="body">{value}{magnitude}</Typography>
    </td>
  </tr>
);

export default class extends Component<Props> {
  render() {
    const {
      id, temperature, correct = 0, vibro = 100, humidity, illumination, daemon, led, hasDoppler, hasDisplay
    } = this.props;
    const rgb = (n) => {
      const a = [];
      for (let i = 1; i <= n; i++) {
        a.push(<RGB id={id} index={i} daemon={daemon} key={`${id}/rgb/${i}`} />);
      }
      return a;
    };
    return [
      hasDisplay && <Display key="display" id={id} daemon={daemon} />,
      ...rgb(led),
      <table key="climate" style={{ textAlign: 'left' }}>
				<tbody>
					<tr>
						<td class="paper">{`Correct ${correct}°C`}</td>
						<td class="paper">
							<Slider
								value={correct}
								min={-12.8}
								max={12.7}
								step={0.1}
								onInput={(event) => {
									send(daemon, {id, type: ACTION_TEMPERATURE_CORRECT, value: event.detail.value})
								 }} />
						</td>
					</tr>
          <Row title="Temperature" value={temperature} magnitude="°C" />
          <Row title="Humidity" value={humidity} magnitude="%" />
          <Row title="Illumination" value={illumination} magnitude="lux" />
					<tr>
						<td class="paper">Vibro</td>
						<td class="paper">
							<Slider
								value={vibro / 25}
								min={0}
								max={10}
								step={1}
								discrete
								onInput={(event) => {
									send(daemon, {id, type: ACTION_VIBRO, value: event.detail.value * 25})
								 }} />
						</td>
					</tr>
        </tbody>
      </table>,
      <table key="buttons">
        <tbody>
          <tr>
            <td className="paper"><Di id={id} index={1} /></td>
            <td className="paper"><Di id={id} index={2} /></td>
            <td className="paper"><Di id={id} index={3} /></td>
            <td className="paper"><Di id={id} index={4} /></td>
          </tr>
        </tbody>
      </table>,
      hasDoppler && <DeviceDoppler daemon={daemon} key="doppler" id={id} />
    ];
  }
}


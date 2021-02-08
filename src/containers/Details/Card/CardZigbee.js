
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { remove, modify } from '../../../actions';
import { CODE, onTemperature, onHumidity, onDoppler } from '../../../constants';
import Button from './CardSensorButton';
import DeviceDoppler from '../../Device/DeviceDoppler';
import SelectScript from '../SelectScript';
import RGB from '../../RGB';

type Props = {
  id: string;
  code: ?string,
  project: string,
  daemon: string,
  temperature: ?number;
  humidity: ?number;
  onTemperature: ?string;
  onHumidity: ?string;
  onDoppler: ?string;
  change: (payload: {}) => void,
  removeField: () => void
};

type RowProps = {
  title: string;
  value: any;
  magnitude: ?string;
  project: string;
  script: ?string;
  onSelect: (id: string) => void;
  onRemove: () => void;
};

const Row = ({
  title, value, magnitude, project, script, onSelect, onRemove
}: RowProps) => (
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
    <td>
      <SelectScript id={script} project={project} onSelect={onSelect} />
    </td>
  </tr>
);


class Container extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  select = (on) => (id) => {
    this.props.change({ [on]: id });
  }

  remove = (on) => () => {
    this.props.change({ [on]: null });
  }

  render() {
    const {
      id, code, project, daemon, temperature, removeField, humidity, endpoint
    } = this.props;
    return (
      <Card>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <table style={{ textAlign: 'left' }}>
          <tbody>
            {
              endpoint.map(e => {
                if (e.cluster.includes('temperature') || e.cluster.includes('thermostat')) {
                  return (
                    <Row
                      title="Temperature"
                      value={temperature}
                      magnitude="°C"
                      script={this.props.onTemperature}
                      onSelect={this.select(onTemperature)}
                      onRemove={this.remove(onTemperature)}
                      project={project}
                    />
                  );
                }
                return null;
              })
            }
            {/* <Row
              title="Humidity"
              value={humidity}
              magnitude="%"
              script={this.props.onHumidity}
              onSelect={this.select(onHumidity)}
              onRemove={this.remove(onHumidity)}
              project={project}
            /> */}
          </tbody>
        </table>
        <CardActions>
          <CardActionIcons>
            <CardAction icon="remove" onClick={removeField} />
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
    details: () => push(`/project/${project}/${id}`),
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);

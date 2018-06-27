
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from 'rmwc/Card';
import { Typography } from 'rmwc/Typography';
import { TextField } from 'rmwc/TextField';
import { remove, set } from '../../../actions';
import { CODE } from '../../../constants';
import Button from './CardSensorButton';

type Props = {
  id: string;
  code: ?string,
  site: ?string,
  temperature: ?number;
  humidity: ?number;
  change: (payload: {}) => void,
  removeField: () => void
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


class Container extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  render() {
    const {
      id, code, site, temperature, removeField, humidity
    } = this.props;
    return (
      <Card>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <table style={{ textAlign: 'left' }}>
          <tbody>
            <Row title="Temperature" value={temperature} magnitude="°C" />
            <Row title="Humidity" value={humidity} magnitude="%" />
          </tbody>
        </table>
        <table>
          <tbody>
            <Button id={id} site={site} index={1} />
            <Button id={id} site={site} index={2} />
            <Button id={id} site={site} index={3} />
            <Button id={id} site={site} index={4} />
          </tbody>
        </table>
        <CardActions>
          <CardActionIcons>
            <CardAction icon use="remove" onClick={removeField} />
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
    removeField: () => (multiple ? remove(parent, field, id) : set(parent, { [field]: null })),
    details: () => push(`/project/${project}/${id}`),
    change: (payload) => set(id, payload)
  }, dispatch)
)(Container);

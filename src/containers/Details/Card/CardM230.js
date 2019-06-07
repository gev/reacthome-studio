
import React, { Component } from 'react';
import type { Children } from 'react';
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
import SelectThermostat from './SelectThermostat';
import SelectWaterCounter from './SelectWaterCounter';

type Props = {
  id: string;
  project: string;
  title: ?String;
  value: ?[];
  total: ?number;
  code: ?String;
  host: ?string;
  port: ?number;
  change: (payload: {}) => void;
  removeField: () => void;
  details: () => void;
};

type RowProps = {
  label: string;
  children: Children;
};

const RowValue = ({ label, children }: RowProps) => (
  <tr>
    <td>
      <Typography use="caption">{label}</Typography>
    </td>
    <td>{children}</td>
  </tr>
);

class Container extends Component<Props> {
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
      project, value, total,
      title, code, host, port = 502,
      details, removeField
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
              {
                Array.isArray(value) && value.map((v, i) => (
                  <RowValue key={`t${i + 1}`} label={`t${i + 1}`}>
                    <Typography use="caption">{v}</Typography>
                  </RowValue>
                ))
              }
              {
                total && (
                  <RowValue label="total">
                    <Typography use="caption">{total}</Typography>
                  </RowValue>
                )
              }
            </tbody>
          </table>
        </div>
        <CardActions>
          <CardActionButtons>
            <CardAction onClick={details}>Details</CardAction>
          </CardActionButtons>
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

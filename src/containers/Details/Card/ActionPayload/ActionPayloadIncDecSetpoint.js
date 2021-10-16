
import Typography from '@rmwc/typography';
import React, { Component } from 'react';
import { DISPLAY, THERMOSTAT } from '../../../../constants';
import Autocomplete from '../../../Filter';
import Setpoint from './Setpoint';

type Props = {
  id: string;
  root: string;
  payload: ?{};
  change: (id: string) => void;
};

export default class extends Component<Props> {
  select = (type) => (id) => {
    const { change, payload } = this.props;
    change({ payload: { ...payload, [type]: id } });
  }

  render() {
    const { root, payload = {} } = this.props;
    return [
      <div key="thermostat" className="paper">
        <Typography>Thermostat</Typography>
        <Autocomplete id={payload.id} root={root} onSelect={this.select(THERMOSTAT)} />
      </div>,
      <div key="display" className="paper">
        <Typography>Display</Typography>
        <Autocomplete id={payload.id} root={root} onSelect={this.select(DISPLAY)} />
      </div>
    ];
  }
}

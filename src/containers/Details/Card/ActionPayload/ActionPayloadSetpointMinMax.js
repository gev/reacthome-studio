
import React, { Component } from 'react';
import Autocomplete from '../../../Filter';
import Setpoint from './Setpoint';
import SetpointMax from './SetpointMax';
import SetpointMin from './SetpointMin';

export default class extends Component {
  select = (id) => {
    const { change, payload } = this.props;
    change({ payload: { ...payload, id } });
  }

  render() {
    const { id, root, payload = {} } = this.props;
    return [
      <div id="id" className="paper">
        <Autocomplete id={payload.id} root={root} onSelect={this.select} />
      </div>,
      <div key="min" className="paper">
        <SetpointMin action={id} payload={payload} />
      </div>,
      <div key="max" className="paper">
        <SetpointMax action={id} payload={payload} />
      </div>
    ];
  }
}


import React, { Component } from 'react';
import Autocomplete from '../../../Filter';
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
      <div key="id" id="id" className="paper">
        <Autocomplete id={payload.id} root={root} onSelect={this.select} />
      </div>,
      <table key={`setpoint${id}`}>
        <tbody>
          <tr>
            <td>
              <div className="paper">
                <SetpointMin action={id} payload={payload} />
              </div>
            </td>
            <td>
              <div className="paper">
                <SetpointMax action={id} payload={payload} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    ];
  }
}

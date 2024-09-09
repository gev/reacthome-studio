
import React, { Component } from 'react';
import { Checkbox } from 'rmwc';
import Slider from '../../../../components/Slider';
import Autocomplete from '../../../Filter';

export default class extends Component {
  select = (id) => {
    const { change, payload } = this.props;
    change({ payload: { ...payload, id } });
  }

  setStart = ({ detail: { value } }) => {
    const { change, payload } = this.props;
    change({ payload: { ...payload, start: value } });
  }

  setEnd = ({ detail: { value } }) => {
    const { change, payload } = this.props;
    change({ payload: { ...payload, end: value } });
  }

  setInverse = () => {
    const { change, payload } = this.props;
    change({ payload: { ...payload, inverse: !payload.inverse } });
  }

  scale = v => 100 * v / 255;

  render() {
    const { root, payload: { id, start = 0, end = 255, inverse = false } = {} } = this.props;
    return (
      <div>
        <div className="paper">
          <Autocomplete id={id} root={root} onSelect={this.select} />
        </div>
        <table>
          <tbody>
            <tr>
              <td width="50%">
                <div className="paper">
                  <Slider label="Start, %" value={start} min={0} max={255} step={1} onInput={this.setStart} scale={this.scale} />
                </div>
              </td>
              <td width="50%">
                <div className="paper">
                  <Slider label="End, %" value={end} min={0} max={255} step={1} onInput={this.setEnd} scale={this.scale} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="paper">
          <Checkbox label="Inverse" checked={inverse} onChange={this.setInverse} />
        </div>
      </div>
    );
  }
}

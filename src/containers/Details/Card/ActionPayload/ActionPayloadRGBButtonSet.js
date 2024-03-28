

import { Button } from '@rmwc/button';
import { MenuItem, SimpleMenu } from '@rmwc/menu';
import React, { Component } from 'react';
import Autocomplete from '../../../Filter';
import RGB from './RGB';

export default class extends Component {
  state = {};

  componentDidMount() {
    const { payload } = this.props;
    if (payload) {
      this.setState({ id: payload.id });
    }
  }

  selectDevice = (id) => {
    this.setState({ id });
  }

  selectIndex = (index) => () => {
    const { change, payload } = this.props;
    change({ payload: { ...payload, id: this.state.id, index } });
  }

  render() {
    const { id, root, payload = {} } = this.props;
    return [
      <div key="id" className="paper">
        <table>
          <tbody>
            <tr>
              <td>
                <Autocomplete id={this.state.id} root={root} onSelect={this.selectDevice} />
              </td>
              <td>
                {
                  this.state.id && (
                    <SimpleMenu handle={<Button>{payload.index === undefined ? 'select' : payload.index}</Button>}>
                      {
                        Array(6).fill(0).map((_, i) => (
                          <MenuItem key={i} onClick={this.selectIndex(i)}>{i}</MenuItem>
                        ))
                      }
                    </SimpleMenu>
                  )
                }

              </td>
            </tr>
          </tbody>
        </table>
      </div>,
      <div key="value" className="paper">
        <RGB action={id} payload={payload} />
      </div>
    ];
  }
}

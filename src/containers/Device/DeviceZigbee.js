
import React, { Component } from 'react';
import Do from './DeviceDoChannel';
import { DO } from '../../constants';

type Props = {
  id: string;
  daemon: string;
  config: {};
};

export default class extends Component<Props> {
  render() {
    const { id, daemon, config } = this.props;
    return Object.entries(config).map(([key, value]) => {
      switch (key) {
        case DO: return (
          <table key="do">
            <tbody>
              <tr>
                {
                  value.map(index => (
                    <td className="paper">
                      <Do id={id} daemon={daemon} index={index} />
                    </td>
                  ))
                }
              </tr>
            </tbody>
          </table>
        );
        default: return null;
      }
    });
  }
}


import React, { Component } from 'react';
import { MenuItem, SimpleMenu } from '@rmwc/menu';

const type = [
  'None',
  'L + R',
  'R + L',
  '1 + 1',
];

const Row = ({ id, daemon, index }) => (
  <tr>
    <td className="paper">{index}</td>
    <td className="paper">
      {/* <SimpleMenu>
        {
          type.map((item, i) => (
            <MenuItem>{item}</MenuItem>
          ))
        }
      </SimpleMenu> */}
    </td>
  </tr>
);

export default class extends Component {
  render() {
    const { id, daemon } = this.props;
    return (
      <table>
        <tbody>
          <Row id={id} daemon={daemon} index={1} />
          <Row id={id} daemon={daemon} index={2} />
        </tbody>
      </table>
    );
  }
}

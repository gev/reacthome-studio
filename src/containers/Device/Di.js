
import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import connect from './connect';

type Props = {
  id: string;
};

type RowProps = {
  id: string;
  index: number;
};

type CellProps = {
  index: number;
  value: ?boolean;
};

const Cell = connect(({ index, value } : CellProps) => (
  <td>
    <div><Typography use="caption">{index}</Typography></div>
    <div><Icon use="fiber_manual_record" theme={value ? 'secondary' : 'text-hint-on-background'} /></div>
  </td>
));

const Row = ({ id, index } : RowProps) => (
  <tr>
    <Cell id={id} index={index + 1} />
    <Cell id={id} index={index + 2} />
    <Cell id={id} index={index + 3} />
    <Cell id={id} index={index + 4} />
    <Cell id={id} index={index + 5} />
    <Cell id={id} index={index + 6} />
    <Cell id={id} index={index + 7} />
    <Cell id={id} index={index + 8} />
  </tr>
);

export default class extends Component<Props> {
  render() {
    const { id } = this.props;
    return (
      <table>
        <tbody>
          <Row id={id} index={0} />
          <Row id={id} index={8} />
        </tbody>
      </table>
    );
  }
}


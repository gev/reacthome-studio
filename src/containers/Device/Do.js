
import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import { Switch } from 'rmwc/Switch';
import connect from './connect';
import { ACTION_DO } from '../../constants';

type Props = {
  id: string;
  daemon: string;
};

type RowProps = {
  id: string;
  daemon: string;
  index: number;
};

type CellProps = {
  id: string;
  index: number;
  value: ?boolean;
  request: (action: {}) => void;
};

const Cell = connect((props: CellProps) => {
  const {
    id, index, value, request
  } = props;

  const setValue = (event) => {
    request({
      type: ACTION_DO, id, index, value: event.target.checked
    });
  };

  return (
    <td>
      <div><Typography use="caption">{index}</Typography></div>
      <div><Switch checked={!!value} onClick={setValue} /></div>
    </td>
  );
});

const Row = ({ id, daemon, index } : RowProps) => (
  <tr>
    <Cell id={id} daemon={daemon} index={index + 1} />
    <Cell id={id} daemon={daemon} index={index + 2} />
    <Cell id={id} daemon={daemon} index={index + 3} />
    <Cell id={id} daemon={daemon} index={index + 4} />
  </tr>
);

export default class extends Component<Props> {
  render() {
    const { id, daemon } = this.props;
    return (
      <table>
        <tbody>
          <Row id={id} daemon={daemon} index={0} />
          <Row id={id} daemon={daemon} index={4} />
        </tbody>
      </table>
    );
  }
}

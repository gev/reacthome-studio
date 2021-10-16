
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleMenu } from '@rmwc/menu';
import { Button } from '@rmwc/button';
import MenuItem from './MenuItem';
import Autocomplete from '../../Filter';
import {
  IR,
  DEVICE_TYPE_IR1,
  DEVICE_TYPE_IR6,
  DEVICE_TYPE_IR_4,
  DEVICE_TYPE_SMART_4A,
  DEVICE_TYPE_SMART_4G,
  DEVICE_TYPE_SMART_4GD,
  DEVICE_TYPE_LAN_AMP,
} from '../../../constants';
import { send } from '../../../websocket/peer';

type Props = {
  id: string,
  root: string;
  onSelect: (id: string) => void
};

type DiProps = {
  id: string;
  type: string,
  index: ?number,
  onSelect: (i: number) => void
};

const c = connect(({ pool }, { id }) => pool[id] || {});

const Ir = c(({
  id, type, index, onSelect
}: DiProps) => {
  const a = [];
  const select = (i) => () => {
    onSelect(i);
  };
  let n;
  switch (type) {
    case DEVICE_TYPE_IR1:
      n = 1;
      break;
    case DEVICE_TYPE_IR_4:
    case DEVICE_TYPE_SMART_4A:
    case DEVICE_TYPE_SMART_4G:
    case DEVICE_TYPE_SMART_4GD:
    case DEVICE_TYPE_LAN_AMP:
      n = 4;
      break;
    case DEVICE_TYPE_IR6:
      n = 6;
      break;
    default: n = 0;
  }
  for (let i = 1; i <= n; i += 1) {
    a.push((
      <MenuItem key={`o${i}`} index={i} onClick={select(i)} id={`${id}/${IR}/${i}`} />
    ));
  }
  return (
    <SimpleMenu handle={<Button>{IR} {index}</Button>}>
      {a}
    </SimpleMenu>
  );
});

class Container extends Component<Props> {
  state = {}
  componentWillMount() {
    const { id } = this.props;
    const [dev,, index] = (id || '').split('/');
    this.setState({ dev, index });
  }
  componentWillReceiveProps({ id }) {
    if (!id) return;
    const [dev,, index] = (id || '').split('/');
    this.setState({ dev, index });
  }
  selectDev = (dev) => {
    this.setState({ dev, index: null });
  }
  selectIR = (index) => {
    this.setState({ index });
    this.props.onSelect(this.state.dev, index);
  }
  render() {
    const { dev, index } = this.state;
    const { root } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td className="paper">
              <Autocomplete id={dev} root={root} onSelect={this.selectDev} />
            </td>
            <td className="paper">
              <Ir id={dev} index={index} onSelect={this.selectIR} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default c(Container);

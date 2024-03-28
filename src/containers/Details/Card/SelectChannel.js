
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleMenu } from '@rmwc/menu';
import { Button } from '@rmwc/button';
import MenuItem from './MenuItem';
import Autocomplete from '../../Filter';
import {
  IR,
  DO,
  DEVICE_TYPE_PLC,
  DEVICE_TYPE_DO8,
  DEVICE_TYPE_DO12,
  DEVICE_TYPE_DIM4,
  DEVICE_TYPE_DIM8_LEGACY,
  DIM,
  ARTNET,
  DRIVER_TYPE_ARTNET,
  DRIVER_TYPE_BB_PLC1,
  DRIVER_TYPE_BB_PLC2,
  DEVICE_TYPE_IR1,
  DEVICE_TYPE_IR6,
  DEVICE_TYPE_IR_4,
} from '../../../constants';


const c = connect(({ pool }, { id }) => pool[id] || {});

const Channel = c(({
  id, type, index, onSelect, size = 0
}) => {
  const a = [];
  const select = (i, t) => () => {
    onSelect(i, t);
  };
  let n;
  let t;
  switch (type) {
    case DEVICE_TYPE_PLC:
      n = 24;
      t = DO;
      break;
    case DRIVER_TYPE_BB_PLC1:
      n = 7;
      t = DO;
      break;
    case DRIVER_TYPE_BB_PLC2:
      n = 15;
      t = DO;
      break;
    case DEVICE_TYPE_DIM4:
      n = 4;
      t = DIM;
      break;
    case DEVICE_TYPE_DIM8_LEGACY:
      n = 8;
      t = DIM;
      break;
    case DEVICE_TYPE_DO8:
      n = 8;
      t = DO;
      break;
    case DEVICE_TYPE_DO12:
      n = 12;
      t = DO;
      break;
    case DRIVER_TYPE_ARTNET:
      n = size;
      t = ARTNET;
      break;
    case DEVICE_TYPE_IR_4:
      n = 4;
      t = IR;
      break;
    case DEVICE_TYPE_IR1:
      n = 1;
      t = IR;
      break;
    case DEVICE_TYPE_IR6:
      n = 6;
      t = IR;
      break;
    default: n = 0;
  }
  for (let i = 1; i <= n; i += 1) {
    a.push((
      <MenuItem key={`o${i}`} index={i} onClick={select(i, t)} id={`${id}/${t}/${i}`} />
    ));
  }
  return (
    <SimpleMenu handle={<Button>{t} {index}</Button>}>
      {a}
    </SimpleMenu>
  );
});

class Container extends Component {
  state = {}
  componentWillMount() {
    const { id } = this.props;
    const [dev, , index] = (id || '').split('/');
    this.setState({ dev, index });
  }
  componentWillReceiveProps({ id }) {
    if (!id) return;
    const [dev, , index] = (id || '').split('/');
    this.setState({ dev, index });
  }
  selectDev = (dev) => {
    this.setState({ dev, index: null });
  }
  selectChannel = (index, type) => {
    this.setState({ index });
    this.props.onSelect(`${this.state.dev}/${type}/${index}`);
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
              <Channel id={dev} index={index} onSelect={this.selectChannel} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default c(Container);

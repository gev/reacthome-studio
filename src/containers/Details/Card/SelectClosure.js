
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleMenu } from '@rmwc/menu';
import { Button } from '@rmwc/button';
import MenuItem from './MenuItem';
import Autocomplete from '../../Filter';
import {
  DO,
  DEVICE_TYPE_PLC,
  DEVICE_TYPE_DO8,
  DEVICE_TYPE_DO12,
  DEVICE_TYPE_DIM4,
  DEVICE_TYPE_DIM_4,
  DEVICE_TYPE_DIM8_LEGACY,
  DIM,
  ARTNET,
  DRIVER_TYPE_ARTNET,
  DRIVER_TYPE_BB_PLC1,
  DRIVER_TYPE_BB_PLC2,
  DEVICE_TYPE_DIM_8,
  DEVICE_TYPE_RELAY_2,
  DEVICE_TYPE_RELAY_6,
  DEVICE_TYPE_RELAY_12,
  DEVICE_TYPE_RELAY_24,
  ENDPOINT,
  GROUP,
  DEVICE_TYPE_MIX_1,
  DEVICE_TYPE_RELAY_2_DIN,
  DEVICE_TYPE_MIX_2,
	DEVICE_TYPE_MIX_1_RS,
} from '../../../constants';

type Props = {
  id: string,
  root: string;
  onSelect: (id: string) => void
};

type DoProps = {
  id: string;
  type: string,
  index: ?number,
  size: ?number,
  onSelect: (i: number) => void
};

const c = connect(({ pool }, { id }) => pool[id] || {});

const Do = c(({
  id, type, endpoint, index, onSelect, version = '', size = 0
}: DoProps) => {
  const a = [];
  const select = (i, t) => () => {
    onSelect(i, t);
  };
  let n;
  const major = parseInt(version.split('.')[0], 10);
  switch (type) {
    case DEVICE_TYPE_RELAY_2:
    case DEVICE_TYPE_RELAY_2_DIN:
      n = 1;
      break;
    case DEVICE_TYPE_RELAY_6:
		case DEVICE_TYPE_MIX_1:
		case DEVICE_TYPE_MIX_1_RS:
    case DEVICE_TYPE_MIX_2:
      n = major >= 2 ? 3 : 0;
      break;
    case DEVICE_TYPE_RELAY_12:
      n = major >= 2 ? 6 : 0;
      break;
    default:
      n = 0;
  }
  if (n === 0) {
    if (Array.isArray(endpoint)) {
      endpoint.forEach(e => {
        if (e.cluster.includes('closure')) {
          a.push((
            <MenuItem key={`o${e.id}`} index={e.id} onClick={select(e.id, ENDPOINT)} id={`${id}/${ENDPOINT}/${e.id}`} />
          ));
        }
      });
    }
  } else {
    for (let i = 1; i <= n; i += 1) {
      a.push((
        <MenuItem key={`o${i}`} index={i} onClick={select(i, GROUP)} id={`${id}/${GROUP}/${i}`} />
      ));
    }
  }
  return (
    <SimpleMenu handle={<Button>{'select'} {index}</Button>}>
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
  selectDo = (index, type) => {
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
              <Do id={dev} index={index} onSelect={this.selectDo} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default c(Container);

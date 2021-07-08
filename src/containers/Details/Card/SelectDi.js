
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleMenu } from '@rmwc/menu';
import { Button } from '@rmwc/button';
import MenuItem from './MenuItem';
import Autocomplete from '../../Filter';
import { DI, DEVICE_TYPE_PLC, DEVICE_TYPE_DI24, DEVICE_TYPE_DI16, DRIVER_TYPE_BB_PLC1, DEVICE_TYPE_CLIMATE, DEVICE_TYPE_RELAY_2, DEVICE_TYPE_DI_4, ENDPOINT, DEVICE_TYPE_RELAY_2_DIN, DO, DEVICE_TYPE_MIX_2, DEVICE_TYPE_MIX_1 } from '../../../constants';

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

const Di = c(({
  id, type, endpoint, index, onSelect
}: DiProps) => {
  const a = [];
  const select = (i, type) => () => {
    onSelect(i, type);
  };
  let n;
  switch (type) {
    case DEVICE_TYPE_DI_4:
    case DEVICE_TYPE_RELAY_2_DIN:
      n = 4;
      break;
    case DEVICE_TYPE_RELAY_2:
      n = 2;
      break;
    case DEVICE_TYPE_CLIMATE:
      n = 4;
      break;
    case DEVICE_TYPE_MIX_1:
      n = 16;
      break;
    case DEVICE_TYPE_MIX_2:
      n = 8;
      break;
    case DEVICE_TYPE_DI16:
      n = 16;
      break;
    case DEVICE_TYPE_DI24:
      n = 25;
      break;
    case DEVICE_TYPE_PLC:
      n = 36;
      break;
    case DRIVER_TYPE_BB_PLC1:
      n = 85;
      break;
    default: n = 0;
  }
  if (n === 0) {
    if (endpoint && Array.isArray(endpoint)) {
      endpoint
        .filter(({ cluster }) => cluster.includes(DO))
        .forEach(i => {
          a.push((
            <MenuItem label={ENDPOINT} key={`o${i.id}`} index={i.id} onClick={select(i.id, ENDPOINT)} id={`${id}/${ENDPOINT}/${i.id}`} />
          ));
        });
    }
  } else {
    for (let i = 1; i <= n; i += 1) {
      a.push((
        <MenuItem key={`o${i}`} index={i} onClick={select(i, DI)} id={`${id}/${DI}/${i}`} />
      ));
    }
  }
  return (
    <SimpleMenu handle={<Button>{DI} {index}</Button>}>
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
  selectDi = (index, type) => {
    console.log(type);
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
              <Di id={dev} index={index} onSelect={this.selectDi} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default c(Container);

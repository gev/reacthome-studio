import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleMenu } from '@rmwc/menu';
import { Button } from '@rmwc/button';
import MenuItem from './MenuItem';
import Autocomplete from '../../Filter';
import { DI, DEVICE_TYPE_PLC, DEVICE_TYPE_DI24, DEVICE_TYPE_DI16, DRIVER_TYPE_BB_PLC1, DEVICE_TYPE_CLIMATE, DEVICE_TYPE_RELAY_2, DEVICE_TYPE_DI_4, ENDPOINT, DEVICE_TYPE_RELAY_2_DIN, DO, DEVICE_TYPE_MIX_2, DEVICE_TYPE_MIX_1, DEVICE_TYPE_SENSOR4, DEVICE_TYPE_SMART_4G, DEVICE_TYPE_SMART_4A, DEVICE_TYPE_SMART_4GD, DEVICE_TYPE_MIX_1_RS, DEVICE_TYPE_SMART_4AM, DEVICE_TYPE_SMART_6_PUSH } from '../../../constants';

const c = connect(({ pool }, { id }) => pool[id] || {});

const Di = c(({
  id, type, endpoint, index, onSelect
}) => {
  const a = [];
  const select = (i, type) => () => {
    onSelect(i, type);
  };
  let n;
  switch (type) {
    case DEVICE_TYPE_DI_4:
    case DEVICE_TYPE_RELAY_2_DIN:
    case DEVICE_TYPE_CLIMATE:
    case DEVICE_TYPE_SENSOR4:
    case DEVICE_TYPE_SMART_4G:
    case DEVICE_TYPE_SMART_4A:
    case DEVICE_TYPE_SMART_4AM:
    case DEVICE_TYPE_SMART_4GD:
      n = 4;
      break;
    case DEVICE_TYPE_SMART_6_PUSH:
      n = 6;
      break;
    case DEVICE_TYPE_RELAY_2:
      n = 2;
      break;
    case DEVICE_TYPE_MIX_1:
    case DEVICE_TYPE_MIX_1_RS:
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
  selectDi = (index, type) => {
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

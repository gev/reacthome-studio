
import { Button } from '@rmwc/button';
import { SimpleMenu } from '@rmwc/menu';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  DEVICE_TYPE_MIX_1,
  DEVICE_TYPE_MIX_1_RS,
  DEVICE_TYPE_MIX_2,
  DEVICE_TYPE_MIX_6x12_RS,
  DEVICE_TYPE_RELAY_12,
  DEVICE_TYPE_RELAY_12_RS,
  DEVICE_TYPE_RELAY_2,
  DEVICE_TYPE_RELAY_2_DIN,
  DEVICE_TYPE_RELAY_6,
  ENDPOINT,
  GROUP
} from '../../../constants';
import Autocomplete from '../../Filter';
import MenuItem from './MenuItem';



const c = connect(({ pool }, { id }) => pool[id] || {});

const Do = c(({
  id, type, endpoint, index, onSelect, version = '', size = 0
}) => {
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
    case DEVICE_TYPE_RELAY_12_RS:
    case DEVICE_TYPE_MIX_6x12_RS:
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

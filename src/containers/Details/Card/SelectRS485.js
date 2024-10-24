
import { Button } from '@rmwc/button';
import { SimpleMenu } from '@rmwc/menu';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DEVICE_TYPE_DI_4_RSM, DEVICE_TYPE_RELAY_12, DEVICE_TYPE_RELAY_24, DEVICE_TYPE_RELAY_6, DEVICE_TYPE_RSHUB, DEVICE_TYPE_RS_HUB_1, DEVICE_TYPE_RS_HUB_1_RS, DEVICE_TYPE_RS_HUB_4, DEVICE_TYPE_SERVER, RS485 } from '../../../constants';
import Autocomplete from '../../Filter';
import MenuItem from './MenuItem';


const c = connect(({ pool }, { id }) => pool[id] || {});

const Channel = c(({ id, type, index, onSelect }) => {
  const a = [];
  const select = (i) => () => {
    onSelect(i);
  };
  let n;
  switch (type) {
    case DEVICE_TYPE_RELAY_6:
    case DEVICE_TYPE_RELAY_12:
    case DEVICE_TYPE_RELAY_24:
    case DEVICE_TYPE_RSHUB:
    case DEVICE_TYPE_RS_HUB_1:
    case DEVICE_TYPE_RS_HUB_1_RS:
    case DEVICE_TYPE_DI_4_RSM:
      n = 1;
      break;
    case DEVICE_TYPE_RS_HUB_4:
    case DEVICE_TYPE_SERVER:
    case DEVICE_TYPE_RS_HUB_4:
      n = 4;
      break;
    default: n = 0;
  }
  for (let i = 1; i <= n; i += 1) {
    a.push((
      <MenuItem key={`o${i}`} index={i} onClick={select(i)} id={`${id}/${RS485}/${i}`} />
    ));
  }
  return (
    <SimpleMenu handle={<Button>{RS485} {index}</Button>}>
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
  selectDi = (index) => {
    this.setState({ index });
    this.props.onSelect(`${this.state.dev}/${RS485}/${index}`);
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
              <Channel id={dev} index={index} onSelect={this.selectDi} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default c(Container);

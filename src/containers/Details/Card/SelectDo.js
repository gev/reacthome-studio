
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
  DEVICE_TYPE_RELAY_2_DIN,
  DEVICE_TYPE_MIX_2,
  DEVICE_TYPE_MIX_1,
  DEVICE_TYPE_AO_4_DIN,
  AO,
  DEVICE_TYPE_MIX_1_RS,
  DEVICE_TYPE_RELAY_12_RS,
  DEVICE_TYPE_DIM_8_RS,
  DEVICE_TYPE_DIM_12_LED_RS,
  DEVICE_TYPE_DIM_12_AC_RS,
  DEVICE_TYPE_DIM_12_DC_RS,
  DEVICE_TYPE_MIX_6x12_RS,
  DEVICE_TYPE_SERVER,
  DRIVER_TYPE_DALI_GW,
  DALI_GROUP,
  DALI_LIGHT,
  GROUP,
  DEVICE_TYPE_RS_HUB_4,
} from '../../../constants';

const c = connect(({ pool }, { id }) => pool[id] || {});

const Do = c(({
  id, type, type_, version = '', endpoint, index, onSelect, size = 0
}) => {
  const a = [];
  const select = (i, t) => () => {
    onSelect(i, t);
  };
  let n;
  let t;
  let hasGroups = false;
  const major = parseInt(version.split('.')[0], 10);
  switch (type) {
    case DEVICE_TYPE_RELAY_2:
    case DEVICE_TYPE_RELAY_2_DIN:
      n = 2;
      t = DO;
      hasGroups = major >= 2;
      break;
    case DEVICE_TYPE_RELAY_6:
    case DEVICE_TYPE_MIX_1:
    case DEVICE_TYPE_MIX_1_RS:
    case DEVICE_TYPE_MIX_2:
    case DEVICE_TYPE_MIX_6x12_RS:
      n = 6;
      t = DO;
      hasGroups = major >= 2;
      break;
    case DEVICE_TYPE_RELAY_12:
    case DEVICE_TYPE_RELAY_12_RS:
      n = 12;
      t = DO;
      hasGroups = major >= 2;
      break;
    case DEVICE_TYPE_RELAY_24:
      n = 24;
      t = DO;
      break;
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
    case DEVICE_TYPE_AO_4_DIN:
      n = 4;
      t = AO;
      break;
    case DEVICE_TYPE_DIM4:
    case DEVICE_TYPE_DIM_4:
      n = 4;
      t = DIM;
      break;
    case DEVICE_TYPE_DIM8_LEGACY:
    case DEVICE_TYPE_DIM_8:
    case DEVICE_TYPE_DIM_8_RS:
      n = 8;
      t = DIM;
      break;
    case DEVICE_TYPE_DIM_12_LED_RS:
    case DEVICE_TYPE_DIM_12_AC_RS:
    case DEVICE_TYPE_DIM_12_DC_RS:
      n = 12;
      t = DIM;
      break;
    case DEVICE_TYPE_SERVER:
    case DEVICE_TYPE_RS_HUB_4:
      n = 3;
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
    default:
      n = 0;
  }
  if (type === DRIVER_TYPE_DALI_GW) {
    for (let i = 0; i < 16; i++) {
      a.push((
        <MenuItem label={DALI_GROUP} key={`g${i}`} index={i} onClick={select(i, DALI_GROUP)} id={`${id}/${DALI_GROUP}/${i}`} />
      ));
    }
    for (let i = 0; i < 64; i++) {
      a.push((
        <MenuItem label={DALI_LIGHT} key={`g${i}`} index={i} onClick={select(i, DALI_LIGHT)} id={`${id}/${DALI_LIGHT}/${i}`} />
      ));
    }
  } else if (n === 0) {
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
    if (hasGroups) {
      for (let i = 1; i <= n / 2; i += 1) {
        a.push((
          <MenuItem label={GROUP} key={`g${i}`} index={i} onClick={select(i, GROUP)} id={`${id}/${GROUP}/${i}`} />
        ));
      }
    }
    for (let i = 1; i <= n; i += 1) {
      a.push((
        <MenuItem label={t} key={`o${i}`} index={i} onClick={select(i, t)} id={`${id}/${t}/${i}`} />
      ));
    }
  }
  return (
    <SimpleMenu handle={<Button>{type_ || 'select'} {index}</Button>}>
      {a}
    </SimpleMenu>
  );
});

class Container extends Component {
  state = {}
  componentWillMount() {
    const { id, device } = this.props;
    const [dev, , index] = (id || '').split('/');
    this.setState({ dev: dev || device, index });
  }
  componentWillReceiveProps({ id }) {
    if (!id) return;
    const [dev, type, index] = (id || '').split('/');
    this.setState({ dev, index, type });
  }
  selectDev = (dev) => {
    this.setState({ dev, index: null, type: null });
  }
  selectDo = (index, type) => {
    this.setState({ index, type });
    this.props.onSelect(`${this.state.dev}/${type}/${index}`);
  }
  render() {
    const { dev, index, type } = this.state;
    const { root } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td className="paper">
              <Autocomplete id={dev} root={root} onSelect={this.selectDev} />
            </td>
            <td className="paper">
              <Do id={dev} type_={type} index={index} onSelect={this.selectDo} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default c(Container);

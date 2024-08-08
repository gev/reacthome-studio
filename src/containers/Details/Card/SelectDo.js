
import { Button } from '@rmwc/button';
import { SimpleMenu } from '@rmwc/menu';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AO,
  ARTNET,
  DALI_GROUP,
  DALI_LIGHT,
  DEVICE_TYPE_AO_4_DIN,
  DEVICE_TYPE_DIM4,
  DEVICE_TYPE_DIM8_LEGACY,
  DEVICE_TYPE_DIM_12_AC_RS,
  DEVICE_TYPE_DIM_12_DC_RS,
  DEVICE_TYPE_DIM_12_LED_RS,
  DEVICE_TYPE_DIM_4,
  DEVICE_TYPE_DIM_8,
  DEVICE_TYPE_DIM_8_RS,
  DEVICE_TYPE_DI_4_RSM,
  DEVICE_TYPE_DO12,
  DEVICE_TYPE_DO8,
  DEVICE_TYPE_MIX_1,
  DEVICE_TYPE_MIX_1_RS,
  DEVICE_TYPE_MIX_2,
  DEVICE_TYPE_MIX_6x12_RS,
  DEVICE_TYPE_PLC,
  DEVICE_TYPE_RELAY_12,
  DEVICE_TYPE_RELAY_12_RS,
  DEVICE_TYPE_RELAY_2,
  DEVICE_TYPE_RELAY_24,
  DEVICE_TYPE_RELAY_2_DIN,
  DEVICE_TYPE_RELAY_6,
  DEVICE_TYPE_RS_HUB_4,
  DEVICE_TYPE_SERVER,
  DIM,
  DO,
  DRIVER_TYPE_ARTNET,
  DRIVER_TYPE_BB_PLC1,
  DRIVER_TYPE_BB_PLC2,
  DRIVER_TYPE_DALI_DLC,
  DRIVER_TYPE_DALI_GW,
  ENDPOINT,
  GROUP,
} from '../../../constants';
import Autocomplete from '../../Filter';
import MenuItem from './MenuItem';

const c = connect(({ pool }, { id }) => pool[id] || {});

const Do = c((props) => {
  const {
    id, type, type_, version = '', endpoint, port, index, onSelect, size = 0
  } = props;
  const a = [];
  const select = (i, t, p) => () => {
    onSelect(i, t, p);
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
    case DEVICE_TYPE_DI_4_RSM:
      n = 1;
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
    for (let i = 0; i < props.numberGroups; i++) {
      a.push((
        <MenuItem label={DALI_GROUP} key={`${id}${DALI_GROUP}${i}`} index={i} onClick={select(i, DALI_GROUP)} id={`${id}/${DALI_GROUP}/${i}`} />
      ));
    }
    for (let i = 0; i < props.numberLights; i++) {
      a.push((
        <MenuItem label={DALI_LIGHT} key={`${id}${DALI_LIGHT}${i}`} index={i} onClick={select(i, DALI_LIGHT)} id={`${id}/${DALI_LIGHT}/${i}`} />
      ));
    }
  } else if (type === DRIVER_TYPE_DALI_DLC) {
    for (let i = 0; i < props.numberGroups1; i++) {
      a.push((
        <MenuItem label={DALI_GROUP + ' 1.'} key={`${id}${DALI_GROUP}1.${i}`} index={i} onClick={select(i, DALI_GROUP, 1)} id={`${id}/${DALI_GROUP}/1.${i}`} />
      ));
    }
    for (let i = 0; i < props.numberLights1; i++) {
      a.push((
        <MenuItem label={DALI_LIGHT + ' 1.'} key={`${id}${DALI_LIGHT}1 ${i}`} index={i} onClick={select(i, DALI_LIGHT, 1)} id={`${id}/${DALI_LIGHT}/1.${i}`} />
      ));
    }
    for (let i = 0; i < props.numberGroups2; i++) {
      a.push((
        <MenuItem label={DALI_GROUP + ' 2.'} key={`${id}${DALI_GROUP}2.${i}`} index={i} onClick={select(i, DALI_GROUP, 2)} id={`${id}/${DALI_GROUP}/2.${i}`} />
      ));
    }
    for (let i = 0; i < props.numberLights2; i++) {
      a.push((
        <MenuItem label={DALI_LIGHT + ' 2.'} key={`${id}${DALI_LIGHT}2 ${i}`} index={i} onClick={select(i, DALI_LIGHT, 2)} id={`${id}/${DALI_LIGHT}/2.${i}`} />
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
    <SimpleMenu handle={<Button>{type_ || 'select'} {port ? port + '.' + index : index}</Button>}>
      {a}
    </SimpleMenu>
  );
});

class Container extends Component {
  state = {}
  componentWillMount() {
    const { id, device } = this.props;
    const [dev, , idx = ''] = (id || '').split('/');
    let port = null;
    let index = null;
    if (idx.includes('.')) {
      [port, index] = idx.split('.');
    } else {
      index = idx;
    }
    this.setState({ dev: dev || device, port, index });
  }
  componentWillReceiveProps({ id }) {
    if (!id) return;
    const [dev, type, idx = ''] = (id || '').split('/');
    let port = null;
    let index = null;
    if (idx.includes('.')) {
      [port, index] = idx.split('.');
    } else {
      index = idx;
    }
    this.setState({ dev, index, port, type });
  }
  selectDev = (dev) => {
    this.setState({ dev, index: null, type: null, port: null });
  }
  selectDo = (index, type, port) => {
    this.setState({ index, type, port });
    this.props.onSelect(`${this.state.dev}/${type}/${port ? port + '.' + index : index}`);
  }
  render() {
    const { dev, index, type, port } = this.state;
    const { root } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td className="paper">
              <Autocomplete id={dev} root={root} onSelect={this.selectDev} />
            </td>
            <td className="paper">
              <Do id={dev} type_={type} port={port} index={index} onSelect={this.selectDo} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default c(Container);

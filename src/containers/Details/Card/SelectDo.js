
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
  DEVICE_TYPE_DIM8,
  DIM
} from '../../../constants';

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

const Do = c(({
  id, type, index, onSelect
}: DiProps) => {
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
    case DEVICE_TYPE_DIM4:
      n = 4;
      t = DIM;
      break;
    case DEVICE_TYPE_DIM8:
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

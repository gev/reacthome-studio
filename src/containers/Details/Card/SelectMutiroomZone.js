
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleMenu } from '@rmwc/menu';
import { Button } from '@rmwc/button';
import MenuItem from './MenuItem';
import Autocomplete from '../../Filter';
import { DEVICE_TYPE_LAN_AMP, MONO, STEREO } from '../../../constants';

const c = connect(({ pool }, { id }) => pool[id] || {});

const Zone = c(({
  id, type, type_, index, onSelect
}) => {
  const a = [];
  const select = (i, type) => () => {
    onSelect(i, type);
  };
  if (type === DEVICE_TYPE_LAN_AMP) {
    for (let i = 1; i <= 2; i += 1) {
      a.push((
        <MenuItem key={`STEREO${i}`} label={STEREO} index={i} onClick={select(i, STEREO)} id={`${id}/${STEREO}/${i}`} />
      ));
    }
    for (let i = 1; i <= 4; i += 1) {
      a.push((
        <MenuItem key={`MONO${i}`} label={MONO} index={i} onClick={select(i, MONO)} id={`${id}/${MONO}/${i}`} />
      ));
    }
  }
  return (
    <SimpleMenu handle={<Button>{type_} {index}</Button>}>
      {a}
    </SimpleMenu>
  );
});

class Container extends Component {
  state = {}
  componentWillMount() {
    const { id } = this.props;
    const [dev, type, index] = (id || '').split('/');
    this.setState({ dev, index, type });
  }
  componentWillReceiveProps({ id }) {
    if (!id) return;
    const [dev, , index] = (id || '').split('/');
    this.setState({ dev, index });
  }
  selectDev = (dev) => {
    this.setState({ dev, index: null });
  }
  selectLanamp = (index, type) => {
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
              <Zone id={dev} type_={type || 'select'} index={index} onSelect={this.selectLanamp} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default c(Container);

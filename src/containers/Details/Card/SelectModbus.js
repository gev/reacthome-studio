
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import Autocomplete from '../../Filter';
import { ADDRESS, MODBUS } from '../../../constants';

type Props = {
  id: string,
  root: string;
  onSelect: (id: string) => void
};

const c = connect(({ pool }, { id }) => pool[id] || {});

class Container extends Component<Props> {
  state = {}
  componentWillMount() {
    const { id } = this.props;
    const [dev,, address] = (id || '').split('/');
    this.setState({ dev, address });
  }
  componentWillReceiveProps({ id }) {
    const [dev,, address = null] = (id || '').split('/');
    this.setState({ dev, address });
  }
  selectDev = (dev) => {
    this.setState({ dev, address: null });
  }
  selectAddress = (event) => {
    const address = event.target.value;
    this.setState({ address });
    const bind = `${this.state.dev}/${MODBUS}/${address}`;
    this.props.onSelect(bind);
  }
  render() {
    const { dev, address } = this.state;
    const { root, onSetAddress } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td className="paper">
              <Autocomplete id={dev} root={root} onSelect={this.selectDev} />
            </td>
            <td className="paper">
              <TextField value={address} onChange={this.selectAddress} label={ADDRESS} />
            </td>
            {
              onSetAddress && (
                <td className="paper">
                  <Button onClick={onSetAddress} >Set</Button>
                </td>
              )
            }
          </tr>
        </tbody>
      </table>
    );
  }
}

export default c(Container);

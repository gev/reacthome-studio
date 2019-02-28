
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField } from '@rmwc/textfield';
import { ARTNET, ACTION_ARTNET, ARTNET_CONFIG } from '../../constants';
import Row from './DeviceArtnetChannel';
import { request } from '../../actions';

type Props = {
  id: string;
  host: ?string;
  port: ?number;
  net: ?number;
  subnet: ?number;
  universe: ?number;
  rate: ?number;
  size: ?number;
  config: (number) => void;
};

class Container extends Component<Props> {
  config = ({ target: { id, value } }) => {
    const { config } = this.props;
    config({ [id]: value });
  };

  render() {
    const {
      id,
      host = '', port = 0x1936,
      net = 0, subnet = 0, universe = 0,
      rate = 40, size = 0,
    } = this.props;
    const rows = [];
    for (let i = 0; i < Math.min(512, size); i += 1) {
      rows.push(<Row {...this.props} key={`${id}/${ARTNET}${i}`} index={i + 1} />);
    }
    return (
      <div>
        <div className="paper">
          <TextField id="host" value={host} label="host" type="text" onChange={this.config} />
          <TextField id="port" value={port} label="port" type="number" onChange={this.config} />
        </div>
        <div className="paper">
          <TextField id="net" value={net} label="net" type="number" onChange={this.config} />
          <TextField id="subnet" value={subnet} label="subnet" type="number" onChange={this.config} />
          <TextField id="universe" value={universe} label="universe" type="number" onChange={this.config} />
        </div>
        <div className="paper">
          <TextField id="rate" value={rate} label="rate fps" type="number" onChange={this.config} />
          <TextField id="size" value={size} label="channels" type="number" onChange={this.config} />
        </div>
        <div style={{ maxWidth: '100%', maxHeight: 600, overflowY: 'auto' }}>
          <table>
            <tbody>
              {
                rows
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id, daemon }) => bindActionCreators({
    config: (payload) => request(daemon, {
      type: ACTION_ARTNET, action: ARTNET_CONFIG, id, payload
    })
  }, dispatch)
)(Container);

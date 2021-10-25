
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Typography from '@rmwc/typography';
import { ACTION_RTP, RTP } from '../../constants';
import { request } from '../../actions';
import TextField from '@rmwc/textfield';
import Checkbox from '@rmwc/checkbox';
import Button from '@rmwc/button';

class Container extends Component {

  state = {}
  
  componentDidMount() {
    const { group, port, active } = this.props;
    this.setState({ group, port, active });
  }

  componentWillReceiveProps({ group, port, active }) {
    this.setState({ group, port, active });
  }

  render() {
    const { index } = this.props;
    const { group = '', port = 0, active = false } = this.state;
    return (
      <tr>
        <td>
          <Typography>{index}</Typography>
        </td>
        <td>
          <Checkbox
            checked={active}
            onChange={() => {
							// this.setState({ active: !active });
							this.props.set(!active, group, port);
            }}
          />
        </td>
        <td>
          <TextField
            value={group}
            onChange={(event) => {
            this.setState({ group: event.target.value });
            }}
          />
        </td>
        <td>
          <TextField
            value={String(port)}
            onChange={(event) => {
            this.setState({ port: parseInt(event.target.value, 10) || 0 });
            }}
          />
        </td>
        <td>
          <Button onClick={() => {
            this.props.set(active, group, port);
          }}
          >
            Set
          </Button>
        </td>
      </tr>
    );
  }
}

export default connect(
  ({ pool }, { id, index }) => pool[`${id}/${RTP}/${index}`] || {},
  (dispatch, { id, index, daemon }) => bindActionCreators({
    set: (active, group, port) => request(daemon, {
      type: ACTION_RTP, id, index, active, group, port
    })
  }, dispatch)
)(Container);


import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SimpleMenu, MenuItem } from 'rmwc/Menu';
import { ROOT, DAEMON, PROJECT } from '../../constants';
import { set } from '../../actions';

type Props = {
  id: string,
  options: [],
  handle: Component,
  set: (id: string, payload: {}) => void
};

class Container extends Component<Props> {
  change = (value) => () => {
    const { id } = this.props;
    this.props.set(id, { [DAEMON]: value });
    this.props.set(value, { [PROJECT]: id });
  }

  render() {
    const { handle, options } = this.props;
    return (
      <SimpleMenu handle={handle}>
        {
          options.map(i => (
            <MenuItem key={i} onClick={this.change(i.value)}>{i.label || i.value}</MenuItem>
          ))
        }
      </SimpleMenu>
    );
  }
}

export default connect(
  ({ pool }) => ({
    options: ((pool[ROOT] || {})[DAEMON] || []).map(i => {
      const o = pool[i] || {};
      return {
        value: i,
        label: o.title || o.code
      };
    })
  }),
  (dispatch) => bindActionCreators({ set }, dispatch)
)(Container);

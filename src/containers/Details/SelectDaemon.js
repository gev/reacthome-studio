
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SimpleMenu, MenuItem } from 'rmwc/Menu';
import { ROOT, DAEMON } from '../../constants';
import { set } from '../../actions';

type Props = {
  options: [],
  handle: Component,
  change: (payload: {}) => void
};

class Container extends Component<Props> {
  change = (value) => () => {
    const { change } = this.props;
    change({ [DAEMON]: value });
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
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => set(id, payload),
  }, dispatch)
)(Container);

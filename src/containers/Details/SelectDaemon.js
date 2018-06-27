
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { set } from '../../actions';
import SelectMenu from './SelectMenu';

type Props = {
  id: string,
  options: [],
  handle: Component,
  set: (id: string, payload: {}) => void
};

class Container extends Component<Props> {
  select = (daemon) => {
    const { id } = this.props;
    this.props.set(id, { daemon });
    this.props.set(daemon, { project: id });
  }

  render() {
    const { handle, options } = this.props;
    return (
      <SelectMenu handle={handle} options={options} onSelect={this.select} />
    );
  }
}

export default connect(
  ({ pool }) => ({
    options: ((pool.root || {}).daemon || [])
  }),
  (dispatch) => bindActionCreators({ set }, dispatch)
)(Container);

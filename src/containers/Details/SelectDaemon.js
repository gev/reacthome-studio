
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modify } from '../../actions';
import SelectMenu from './SelectMenu';

type Props = {
  id: string,
  options: [],
  handle: Component,
  modify: (id: string, payload: {}) => void
};

class Container extends Component<Props> {
  select = (daemon) => {
    const { id } = this.props;
    this.props.modify(id, { daemon });
    this.props.modify(daemon, { project: id });
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
  (dispatch) => bindActionCreators({ modify }, dispatch)
)(Container);

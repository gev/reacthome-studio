
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modify } from '../../actions';
import SelectMenu from './SelectMenu';
import { DAEMON } from '../../constants';

class Container extends Component {
  select = (daemon) => {
    const { id } = this.props;
    this.props.modify(id, { daemon });
    this.props.modify(daemon, { project: id });
  }

  render() {
    const { handle, daemon = [] } = this.props;
    return (
      <SelectMenu handle={handle} select={[DAEMON]} onSelect={this.select} />
    );
  }
}

export default connect(
  ({ pool }) => pool.root || {},
  (dispatch) => bindActionCreators({ modify }, dispatch)
)(Container);

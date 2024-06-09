
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../actions';
import { DAEMON } from '../../constants';
import SelectMenu from './SelectMenu';

class Container extends Component {
  select = (daemon) => {
    const { id } = this.props;
    this.props.modify(id, { daemon });
    this.props.modify(daemon, { project: id });
  }

  render() {
    const { handle } = this.props;
    return (
      <SelectMenu handle={handle} select={[DAEMON]} onSelect={this.select} />
    );
  }
}

export default connect(
  ({ pool }) => pool.root || {},
  (dispatch) => bindActionCreators({ modify }, dispatch)
)(Container);

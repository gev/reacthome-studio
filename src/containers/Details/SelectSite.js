
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SITE } from '../../constants';
import Autocomplete from '../Filter';

class Container extends Component {
  render() {
    const {
      id, project, onSelect
    } = this.props;
    return (
      <Autocomplete id={id} root={project} onSelect={onSelect} type={SITE} />
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {}
)(Container);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SCRIPT } from '../../../../constants';
import { modify } from '../../../../actions';
import SelectScript from '../../SelectScript';

class Container extends Component {
  select = (id) => {
    this.props.modify(id);
  }

  render() {
    const { payload, field = SCRIPT, project } = this.props;
    return (
      <SelectScript id={payload[field]} project={project} onSelect={this.select} />
    );
  }
}

export default connect(
  ({ pool }, { payload = {}, field = SCRIPT }) => pool[payload[field]] || {},
  (dispatch, { action, payload, field = SCRIPT }) => bindActionCreators({
    modify: (script) => modify(action, { payload: { ...payload, [field]: script } }),
  }, dispatch)
)(Container);

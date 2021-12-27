
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { SCRIPT } from '../../../../constants';
import { modify } from '../../../../actions';
import SelectMenu from '../../SelectMenu';

class Container extends Component {
  select = (id) => {
    this.props.modify(id);
  }

  render() {
    const {
      title, code, project, field
    } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || field || SCRIPT}</Button>}
        onSelect={this.select}
        select={[SCRIPT]}
        root={project}
      />
    );
  }
}

export default connect(
  ({ pool }, { payload = {}, field = SCRIPT }) => pool[payload[field]] || {},
  (dispatch, { action, payload, field = SCRIPT }) => bindActionCreators({
    modify: (script) => modify(action, { payload: { ...payload, [field]: script } }),
  }, dispatch)
)(Container);

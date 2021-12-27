
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { TV } from '../../../../constants';
import { modify } from '../../../../actions';
import SelectMenu from '../../SelectMenu';

class Container extends Component {
  select = (id) => {
    this.props.modify(id);
  }

  render() {
    const { title, code, project } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || TV}</Button>}
        onSelect={this.select}
        select={[TV]}
        root={project}
      />
    );
  }
}

export default connect(
  ({ pool }, { payload: { id } = {} }) => pool[id] || {},
  (dispatch, { action, payload }) => bindActionCreators({
    modify: (id) => modify(action, { payload: { ...payload, id } }),
  }, dispatch)
)(Container);

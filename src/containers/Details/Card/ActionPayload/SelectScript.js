
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
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
      title, code, options, field
    } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || field || SCRIPT}</Button>}
        onSelect={this.select}
        options={options}
      />
    );
  }
}

const filter = (pool, root, a = []) => {
  const o = pool[root];
  if (o) {
    a.push(root);
    if (o.site) o.site.forEach(i => filter(pool, i, a));
  }
  return a;
};

export default connect(
  createSelector(
    ({ pool }, { payload = {}, field = SCRIPT }) => pool[payload[field]],
    ({ pool }, { project }) => pool[project].script,
    (o, options) => ({ ...o, options })
  ),
  (dispatch, { action, payload, field = SCRIPT }) => bindActionCreators({
    modify: (script) => modify(action, { payload: { ...payload, [field]: script } }),
  }, dispatch)
)(Container);

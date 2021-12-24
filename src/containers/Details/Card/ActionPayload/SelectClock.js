
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector  } from 'reselect';
import { Button } from '@rmwc/button';
import { CLOCK } from '../../../../constants';
import { modify } from '../../../../actions';
import SelectMenu from '../../SelectMenu';


class Container extends Component {
  select = (id) => {
    this.props.modify(id);
  }

  render() {
    const { title, code, options } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || CLOCK}</Button>}
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
    ({ pool }, { payload: { id } = {} }) => pool[id],
    ({ pool }, { project }) => pool[project].clock,
    (o, options) => ({ ...o, options })
  ),
  (dispatch, { action, payload }) => bindActionCreators({
    modify: (id) => modify(action, { payload: { ...payload, id } }),
  }, dispatch)
)(Container);

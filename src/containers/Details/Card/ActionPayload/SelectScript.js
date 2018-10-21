
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { SCRIPT } from '../../../../constants';
import { set } from '../../../../actions';
import SelectMenu from '../../SelectMenu';

type Props = {
  title: ?string,
  code: ?string,
  options: [],
  set: (id: string) => void;
};

class Container extends Component<Props> {
  select = (id) => {
    this.props.set(id);
  }

  render() {
    const { title, code, options } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || SCRIPT}</Button>}
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
  ({ pool }, { project, payload: { script } = {} }) => ({
    ...pool[script],
    options: pool[project].script
  }),
  (dispatch, { action, payload }) => bindActionCreators({
    set: (script) => set(action, { payload: { ...payload, script } }),
  }, dispatch)
)(Container);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'rmwc/Button';
import { LIGHT } from '../../../../constants';
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
        handle={<Button>{title || code || LIGHT}</Button>}
        onSelect={this.select}
        options={options}
      />
    );
  }
}

const filter = (pool, root, a = []) => {
  const o = pool[root];
  if (o) {
    if (o.light_220) o.light_220.forEach(i => a.push(i));
    if (o.light_LED) o.light_LED.forEach(i => a.push(i));
    if (o.site) o.site.forEach(i => filter(pool, i, a));
  }
  return a;
};

export default connect(
  ({ pool }, { root, payload: { id } = {} }) => ({
    ...pool[id],
    options: filter(pool, root)
  }),
  (dispatch, { action, payload }) => bindActionCreators({
    set: (id) => set(action, { payload: { ...payload, id } }),
  }, dispatch)
)(Container);

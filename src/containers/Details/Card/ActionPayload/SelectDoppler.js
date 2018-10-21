
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { DOPPLER } from '../../../../constants';
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
        handle={<Button>{code || title || DOPPLER}</Button>}
        onSelect={this.select}
        options={options}
      />
    );
  }
}

const filter = (pool, root, a = []) => {
  const o = pool[root];
  if (o) {
    if (o.sensor) o.sensor.forEach(i => a.push(i));
    if (o.doppler) o.doppler.forEach(i => a.push(i));
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

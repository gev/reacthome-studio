/* eslint-disable camelcase */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { WATER_COUNTER } from '../../../constants';
import SelectMenu from '../SelectMenu';
import { set } from '../../../actions';

type Props = {
  title: ?string,
  code: ?string,
  options: [],
  select: (id: string) => void;
};

class Container extends Component<Props> {
  render() {
    const {
      title, code, options, select
    } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || WATER_COUNTER}</Button>}
        onSelect={select}
        options={options}
      />
    );
  }
}

const filter = (pool, root, a = [null]) => {
  const o = pool[root];
  if (o) {
    if (o.water_counter) o.water_counter.forEach(i => a.push(i));
    if (o.site) o.site.forEach(i => filter(pool, i, a));
  }
  return a;
};

export default connect(
  ({ pool }, { root, id }) => ({ ...pool[pool[id].water_counter], options: filter(pool, root) }),
  (dispatch, { id }) => bindActionCreators({
    select: (water_counter) => set(id, { water_counter })
  }, dispatch)
)(Container);

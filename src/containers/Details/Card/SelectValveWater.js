
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import { VALVE_WATER } from '../../../constants';
import SelectMenu from '../SelectMenu';

type Props = {
  title: ?string,
  code: ?string,
  options: [],
  onSelect: (id: string) => void;
};

class Container extends Component<Props> {
  render() {
    const {
      title, code, options, onSelect
    } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || VALVE_WATER}</Button>}
        onSelect={onSelect}
        options={options}
      />
    );
  }
}

const filter = (pool, root, a = []) => {
  const o = pool[root];
  if (o) {
    if (o.valve_water) o.valve_water.forEach(i => a.push(i));
    if (o.site) o.site.forEach(i => filter(pool, i, a));
  }
  return a;
};

export default connect(({ pool }, { root, id }) =>
  ({ ...pool[id], options: filter(pool, root) }))(Container);

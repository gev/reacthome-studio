
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'rmwc/Button';
import { SCENE } from '../../../constants';
import SelectMenu from '../SelectMenu';

type Props = {
  id: ?string,
  title: ?string,
  code: ?string,
  options: [],
  onSelect: (id: string) => void
};

class Container extends Component<Props> {
  render() {
    const {
      id, title, code, options, onSelect
    } = this.props;
    return (
      <SelectMenu
        handle={<Button theme={id ? 'primary' : 'text-hint-on-background'}>{title || code || SCENE}</Button>}
        onSelect={onSelect}
        options={options}
      />
    );
  }
}

const filter = (pool, root, a = []) => {
  const o = pool[root];
  if (o) {
    if (o.scene) o.scene.forEach(i => a.push(i));
    if (o.site) o.site.forEach(i => filter(pool, i, a));
  }
  return a;
};

export default connect(({ pool }, { root, id }) =>
  ({ ...pool[id], options: filter(pool, root) }))(Container);

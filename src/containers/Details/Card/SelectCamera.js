
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import { CAMERA } from '../../../constants';
import SelectMenu from '../SelectMenu';

class Container extends Component {
  render() {
    const {
      title, code, options, onSelect
    } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || CAMERA}</Button>}
        onSelect={onSelect}
        options={options}
      />
    );
  }
}

const filter = (pool, root, a = []) => {
  const o = pool[root];
  if (o) {
    if (o.camera) o.camera.forEach(i => a.push(i));
    if (o.site) o.site.forEach(i => filter(pool, i, a));
  }
  return a;
};

export default connect(({ pool }, { root, id }) =>
  ({ ...pool[id], options: filter(pool, root) }))(Container);

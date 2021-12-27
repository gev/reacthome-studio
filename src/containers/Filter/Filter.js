
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';

const filter = (pool, id, test, a = [], f = []) => {
  if (id && !f.includes(id)) {
    f.push(id);
    const o = pool[id];
    if (o) {
      if (test(o)) a.push([id, o]);
      Object.values(o).forEach(i => {
        if (Array.isArray(i)) {
          i.forEach(j => filter(pool, j, test, a, f));
        } else if (i) {
          filter(pool, i, test, a, f);
        }
      });
    }
  }
  return a;
};

class Container extends Component {
  shouldComponentUpdate(props) {
    return this.props.text !== props.text
  }
  render() {
    const t = this.props.text.toLowerCase();
    const list = filter(this.props.pool, this.props.id, ({ code, title }) => (
      (code && String(code).toLowerCase().includes(t)) ||
      (title && String(title).toLowerCase().includes(t))
    )) || [];
    return list.map(
      i => (
        <Item
          key={i[0]}
          id={i[0]}
          {...i[1]}
          onSelect={this.props.onSelect} />
      )
    );
  }
};

export default connect(({ pool }) => ({ pool }))(Container);
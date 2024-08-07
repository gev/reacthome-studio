
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectMenuItem from './SelectMenuItem';

const filter = (pool, root, select) => {
  if (root) {
    const a = [];
    const filter_ = (id) => {
      const o = pool[id];
      if (o) {
        if (select) {
          select.forEach(i => {
            if (Array.isArray(o[i])) {
              o[i].forEach(i => a.push(i));
            }
          });
        } else {
          a.push(id);
        }
        if (o.site) o.site.forEach(i => filter_(i));
      }
    }
    filter_(root)
    return a;
  }
  return (pool.root || {})[select] || []
};

class Container extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { pool, root, select, onSelect } = this.props;
    const options = filter(pool, root, select);
    return (
      <div>
        {
          options.map(i => (
            <SelectMenuItem key={i} id={i} onSelect={onSelect} />
          ))
        }
      </div>
    )
  }
};

export default connect(
  ({ pool }) => ({ pool })
)(Container);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';

import { DAEMON, DEVICE_TYPES, PROJECT, SITE } from '../../constants';

const list = (pool, id, type, a = [], f = []) => {
  if (id && !f.includes(id)) {
    f.push(id);
    const o = pool[id];
    if (o) {
      if (o.title || o.code) {
        if (type ? o.type === type : true) {
          a.push([id, DEVICE_TYPES[o.type] ? { ...o, type: DEVICE_TYPES[o.type].title } : o]);
        }
      }
      if (o.type === DAEMON
        || o.type === PROJECT
        || o.type === SITE) {
        Object.values(o).forEach(i => {
          if (Array.isArray(i)) {
            i.forEach(j => list(pool, j, type, a, f));
          } else if (i) {
            list(pool, i, type, a, f);
          }
        });
      }
      if (Array.isArray(o.temperature_ext)) {
        o.temperature_ext.forEach(i => list(pool, i, type, a, f));
      }
      if (o.top) {
        list(pool, o.top, type, a, f);
      }
      if (Array.isArray(o.driver)) {
        o.driver.forEach(i => Object.keys(pool).filter(id => id.startsWith(`${i}/`)).filter(i => list(pool, i, type, a, f)));
      }
    }
  }
  return a;
};

class Container extends Component {
  constructor(props) {
    super(props);
    this.list = list(this.props.pool, this.props.id, this.props.type);
  }
  shouldComponentUpdate(props) {
    return this.props.text !== props.text
  }
  render() {
    const t = this.props.text.toLowerCase();
    const items = t ? this.list.filter(([_, { code, title, type }]) => (
      (type && String(type).toLowerCase().includes(t)) ||
      (code && String(code).toLowerCase().includes(t)) ||
      (title && String(title).toLowerCase().includes(t))
    )) : this.list;
    return items.map(
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

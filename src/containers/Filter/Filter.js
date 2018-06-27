
import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';

type Props = {
  list: [],
  onSelect: ?(id: string) => void
};

const Container = ({ list, onSelect }: Props) =>
  list.map(i => <Item key={i[0]} id={i[0]} {...i[1]} onSelect={onSelect} />);

const filter = (pool, root, test, a = [], f = []) => {
  if (root && !f.includes(root)) {
    f.push(root);
    const o = pool[root];
    if (o) {
      if (test(o)) a.push([root, o]);
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

export default connect(({ pool }, { root, text }) =>
  ({
    list: text ? filter(pool, root, ({ code, title, type }) => {
      const t = text.toLowerCase();
      return (
        // (id && String(id).toLowerCase().includes(t)) ||
        (code && String(code).toLowerCase().includes(t)) ||
        (type && String(type).toLowerCase().includes(t)) ||
        (title && String(title).toLowerCase().includes(t))
      );
    }) : []
  }))(Container);

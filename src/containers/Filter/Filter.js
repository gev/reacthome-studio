
import debounce from 'debounce';
import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';

type Props = {
  list: [],
  onSelect: ?(id: string) => void
};

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

const deboncedFilter = debounce(filter, 250);

const Container = (props) => {
  if (props.text && props.text.length > 1) {
    const t = props.text.toLowerCase();
    const list = deboncedFilter(props, props.id, ({ code, title }) => (
      (code && String(code).toLowerCase().includes(t)) ||
      (title && String(title).toLowerCase().includes(t))
    )) || [];
    return list.map(i => <Item key={i[0]} id={i[0]} {...i[1]} onSelect={props.onSelect} />);
  } 
  return [];
};

export default connect (({ pool }) => pool)(Container);
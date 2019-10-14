
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { TV } from '../../../../constants';
import { modify } from '../../../../actions';
import SelectMenu from '../../SelectMenu';

type Props = {
  title: ?string,
  code: ?string,
  options: [],
  modify: (id: string) => void;
};

class Container extends Component<Props> {
  select = (id) => {
    this.props.modify(id);
  }

  render() {
    const { title, code, options } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || TV}</Button>}
        onSelect={this.select}
        options={options}
      />
    );
  }
}

const filter = (pool, root, a = []) => {
  const o = pool[root];
  if (o) {
    if (o.TV) o.TV.forEach(i => a.push(i));
    if (o.site) o.site.forEach(i => filter(pool, i, a));
  }
  return a;
};

export default connect(
  ({ pool }, { project, payload: { id } = {} }) => ({
    ...pool[id],
    options: filter(pool, project)
  }),
  (dispatch, { action, payload }) => bindActionCreators({
    modify: (id) => modify(action, { payload: { ...payload, id } }),
  }, dispatch)
)(Container);

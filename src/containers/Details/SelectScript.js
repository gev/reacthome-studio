
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import { SCRIPT } from '../../constants';
import SelectMenu from './SelectMenu';
import { Link } from 'react-router-dom';

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
      id, project, title, code, options, onSelect
    } = this.props;
    return (
      <SelectMenu
        handle={
          <div>
            <Button theme={id ? 'primary' : 'text-hint-on-background'}>{code || title || SCRIPT}</Button>
            <Link to={`/project/${project}/${id}`}>.</Link>
          </div>
          }
        onSelect={onSelect}
        options={options}
      />
    );
  }
}

const filter = (pool, root, a = []) => {
  const o = pool[root];
  if (o) {
    if (o.script) o.script.forEach(i => a.push(i));
    if (o.script) o.script.forEach(i => filter(pool, i, a));
  }
  return a;
};

export default connect(({ pool }, { project, id }) =>
  ({ ...pool[id], options: pool[project].script }))(Container);

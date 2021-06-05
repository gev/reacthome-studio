
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { SCRIPT } from '../../../../constants';
import { modify } from '../../../../actions';
import SelectMenu from '../../SelectMenu';
import { Link } from 'react-router-dom';

type Props = {
  title: ?string,
  code: ?string,
  field: ?string,
  options: [],
  modify: (id: string) => void;
};

class Container extends Component<Props> {
  select = (id) => {
    this.props.modify(id);
  }

  render() {
    const {
      script, project, title, code, options, field
    } = this.props;
    return (
      <SelectMenu
        handle={(
          <div>
            <Button>{code || title || field || SCRIPT}</Button>
            <Link to={`/project/${project}/${script}`}>.</Link>
          </div>
        )}
        onSelect={this.select}
        options={options}
      />
    );
  }
}

const filter = (pool, root, a = []) => {
  const o = pool[root];
  if (o) {
    a.push(root);
    if (o.site) o.site.forEach(i => filter(pool, i, a));
  }
  return a;
};

export default connect(
  ({ pool }, { project, payload = {}, field = SCRIPT }) => ({
    ...pool[payload[field]],
    script: payload[field],
    options: pool[project].script
  }),
  (dispatch, { action, payload, field = SCRIPT }) => bindActionCreators({
    modify: (script) => modify(action, { payload: { ...payload, [field]: script } }),
  }, dispatch)
)(Container);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@rmwc/button';
import { SCRIPT } from '../../constants';
import SelectMenu from './SelectMenu';
import Autocomplete from '../Filter';

class Container extends Component {
  render() {
    const {
      id, project, title, code, onSelect
    } = this.props;
    return (
      <Autocomplete id={id} root={project} onSelect={onSelect} type={SCRIPT} />

      // <SelectMenu
      //   handle={
      //     <div>
      //       <Button theme={id ? 'primary' : 'text-hint-on-background'}>{code || title || SCRIPT}</Button>
      //       <Link to={`/project/${project}/${id}`}>.</Link>
      //     </div>
      //     }
      //   onSelect={onSelect}
      //   select={[SCRIPT]}
      //   root={project}
      // />
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {}
)(Container);


import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField } from '@rmwc/textfield';
import { modify, create, add, addBind, remove } from '../../actions';
import { TITLE, CODE } from '../../constants';
import AbstractDetails from './DetailsAbstract';
import Details from './Details';

class Container extends AbstractDetails {
  render() {
    const { title, code } = this.props;
    return (
      <div className="paper content">
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} fullwidth placeholder="Untitled" className="title" />
          <TextField id={CODE} value={code || ''} onChange={this.change} placeholder="code" />
        </div>
        <Details {...this.props} />
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => modify(id, payload),
    create: (field, type, ref) => create(id, field, type, ref),
    add: (field, subj) => add(id, field, subj),
    addBind: (field, subj, bind) => addBind(id, field, subj, bind),
    modify: (subj, payload) => modify(subj, payload),
    remove: (subj, field, obj) => remove(subj, field, obj)
  }, dispatch)
)(Container);


import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField } from 'rmwc/TextField';
import { set, create, add, remove } from '../../actions';
import { TITLE } from '../../constants';
import AbstractDetails from './DetailsAbstract';
import Details from './Details';

class Container extends AbstractDetails {
  render() {
    const { title } = this.props;
    return (
      <div className="paper content">
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} fullwidth placeholder="Untitled" style={{ fontSize: 48 }} />
        </div>
        <Details {...this.props} />
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => ({ ...pool[id], get: (subj) => pool[subj] || {} }),
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => set(id, payload),
    create: (field, type, ref) => create(id, field, type, ref),
    add: (field, subj) => add(id, field, subj),
    set: (subj, payload) => set(subj, payload),
    remove: (subj, field, obj) => remove(subj, field, obj)
  }, dispatch)
)(Container);

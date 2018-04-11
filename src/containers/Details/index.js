
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField } from 'rmwc/TextField';
import { set, create } from '../../actions';
import { TITLE } from '../../constants';
import AbstractDetails from './AbstractDetails';
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
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => set(id, payload),
    add: (field) => create(id, field)
  }, dispatch)
)(Container);

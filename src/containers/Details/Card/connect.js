
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { set } from '../../../actions';

export default (type) => connect(
  ({ pool }, { id, index }) => pool[`${id}/${type}/${index}`] || {},
  (dispatch, { id, index }) => bindActionCreators({
    set: (payload) => set(`${id}/${type}/${index}`, payload)
  }, dispatch)
);

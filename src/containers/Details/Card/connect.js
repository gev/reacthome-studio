
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../actions';

export default (type) => connect(
  ({ pool }, { id, index }) => pool[`${id}/${type}/${index}`] || {},
  (dispatch, { id, index }) => bindActionCreators({
    modify: (payload) => modify(`${id}/${type}/${index}`, payload)
  }, dispatch)
);

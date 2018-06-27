
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { request, set } from '../../actions';

export default (type) => connect(
  ({ pool }, { id, index }) => pool[`${id}/${type}/${index}`] || {},
  (dispatch, { daemon }) => bindActionCreators({
    request: (action) => request(daemon, action),
    set: (id, payload) => set(id, payload)
  }, dispatch)
);

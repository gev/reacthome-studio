
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { request, modify, makeBind } from '../../actions';

export default (type) => connect(
  ({ pool }, { id, index }) => pool[`${id}/${type}/${index}`] || {},
  // ({ pool }, { id, index }) => ({ ...pool[`${id}/${type}/${index}`], get: (i) => pool[i] }),
  (dispatch, { daemon }) => bindActionCreators({
    request: (action) => request(daemon, action),
    modify: (id, payload) => modify(id, payload),
    makeBind
  }, dispatch)
);

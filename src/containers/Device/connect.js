
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { request, set, makeBind } from '../../actions';

export default (type) => connect(
  ({ pool }, { id, index }) => pool[`${id}/${type}/${index}`] || {},
  // ({ pool }, { id, index }) => ({ ...pool[`${id}/${type}/${index}`], get: (i) => pool[i] }),
  (dispatch, { daemon }) => bindActionCreators({
    request: (action) => request(daemon, action),
    set: (id, payload) => set(id, payload),
    makeBind
  }, dispatch)
);

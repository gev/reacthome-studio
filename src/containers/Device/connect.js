
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { request } from '../../actions';

export default connect(
  ({ pool }, { id, index }) => pool[`${id}/${index}`] || {},
  (dispatch,  { daemon }) => bindActionCreators({
    request: (action) => request(daemon, action)
  }, dispatch)
);

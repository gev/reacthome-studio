import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import connectTo from '../websocket';

class ServiceManager extends Component {
  // componentWillMount() {
  //   const { daemon = [] } = this.props;
  //   daemon.forEach(id => {
  //     this.props.connectTo(id);
  //   });
  // } 
  render() {
    return this.props.children;
  }
}

export default connect(
  ({ pool }) => pool.root || {},
  dispatch => bindActionCreators({ connectTo }, dispatch)
)(ServiceManager);

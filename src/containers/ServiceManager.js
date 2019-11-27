
import { Component } from 'react';
import type { Children } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import connectTo from '../webrtc';

type Props = {
  daemon: [],
  children: Children,
  webrtc: (id: string) => void,
};

class ServiceManager extends Component<Props> {
  componentWillMount() {
    const { daemon = [] } = this.props;
    daemon.forEach(id => {
      this.props.webrtc(id);
    });
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  ({ pool }) => pool.root || {},
  dispatch => bindActionCreators({ webrtc: connectTo }, dispatch)
)(ServiceManager);

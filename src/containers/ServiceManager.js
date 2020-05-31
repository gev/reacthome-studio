
import { Component } from 'react';
import type { Children } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import connectTo from '../websocket';

type Props = {
  daemon: [],
  children: Children,
  websocket: (id: string) => void,
};

class ServiceManager extends Component<Props> {
  componentWillMount() {
    const { daemon = [] } = this.props;
    daemon.forEach(id => {
      this.props.websocket(id);
    });
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  ({ pool }) => pool.root || {},
  dispatch => bindActionCreators({ websocket: connectTo }, dispatch)
)(ServiceManager);

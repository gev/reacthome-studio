
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { codes } from 'reacthome-ircodes';
import { SCREEN } from '../../../../constants';
import { modify } from '../../../../actions';
import SelectMenu from '../../SelectMenu';

class Container extends Component {
  state = {};

  async componentWillMount() {
    const { brand, model } = this.props;
    const { command = {} } = ((codes[SCREEN] || {})[brand] || {})[model] || {};
    this.setState({ commands: Object.keys(command) });
  }

  async componentWillReceiveProps(props) {
    const { brand, model } = props;
    const { command = {} } = ((codes[SCREEN] || {})[brand] || {})[model] || {};
    this.setState({ commands: Object.keys(command) });
  }

  render() {
    const { payload: { command } = {} } = this.props;
    const { commands = [] } = this.state;
    return (
      <SelectMenu
        handle={<Button>{command || 'command'}</Button>}
        onSelect={this.props.modify}
        options={commands}
      />
    );
  }
}

export default connect(
  ({ pool }, { payload: { id } = {} }) => pool[id] || {},
  (dispatch, { action, payload }) => bindActionCreators({
    modify: (command) => modify(action, { payload: { ...payload, command } }),
  }, dispatch)
)(Container);

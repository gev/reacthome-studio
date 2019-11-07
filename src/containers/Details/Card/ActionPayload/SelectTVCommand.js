
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { getCommands } from 'reacthome-ircodes';
import { TV } from '../../../../constants';
import { modify } from '../../../../actions';
import SelectMenu from '../../SelectMenu';

type Props = {
  payload: ?{};
  modify: (id: string) => void;
};

class Container extends Component<Props> {
  state = {};

  async componentWillMount() {
    const { brand, model } = this.props;
    const commands = await getCommands(TV, brand, model);
    this.setState({ commands: commands.map(i => i.split('.')[0]) });
  }

  async componentWillReceiveProps(props) {
    const { brand, model } = props;
    const commands = await getCommands(TV, brand, model);
    this.setState({ commands: commands.map(i => i.split('.')[0]) });
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


import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect, } from 'react-redux';
import { push } from 'react-router-redux';
import { List } from '@rmwc/list';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { add, set } from '../actions';
import connectTo from '../websocket';
import { ROOT, PROJECT, DAEMON } from '../constants';
import ListItem from './ListItem';

type Props = {
  daemon: [];
  connectTo: (string) => void;
  navigate: (string) => void;
  add: (string) => void;
  set: (string, {}) => void;
};

class Daemons extends Component<Props> {
  navigate = (id) => () => {
    this.props.connectTo(id);
    this.props.navigate(id);
    this.props.add(ROOT, DAEMON, id);
  };

  change = (event) => {
    const id = event.target.value;
    this.props.set(id, { type: DAEMON });
    this.props.add(ROOT, DAEMON, id);
    this.props.connectTo(id);
  }

  render() {
    const { daemon } = this.props;
    return (
      <div>
        <div>
          <Typography use="headline4">Servers</Typography>
        </div>
        <List>
          {
            daemon.map(id => (
              <ListItem key={id} id={id} onClick={this.navigate(id)} />
            ))
          }
        </List>
        <div>
          <TextField label={DAEMON} onChange={this.change} />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ pool }) => pool.root || {},
  (dispatch) => bindActionCreators({
    navigate: (id) => push(`/daemon/${id}`),
    connectTo,
    add,
    set,
  }, dispatch)
)(Daemons);

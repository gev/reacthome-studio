
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect, } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from '@rmwc/button';
import { List } from '@rmwc/list';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { add, set, remove } from '../actions';
import connectTo from '../websocket';
import { ROOT, DAEMON } from '../constants';
import ListItem from './ListItem';

class Daemons extends Component {
  state = {};
  navigate = (id) => () => {
    this.props.set(id, { type: DAEMON, timestamp: 0 });
    this.props.add(ROOT, DAEMON, id);
    this.props.connectTo(id);
    this.props.navigate(id);
  };

  add = () => {
    const id = this.state.daemon;
    if (id) {
      this.props.set(id, { type: DAEMON });
      this.props.add(ROOT, DAEMON, id);
      this.props.connectTo(id);
    }
  }
  change = (event) => {
    this.setState({ daemon: event.target.value })
  }

  remove = (id) => () => {
    this.props.remove(ROOT, DAEMON, id)
  }

  render() {
    const { daemon = [] } = this.props;
    return (
      <div>
        <div>
          <Typography use="headline4">Servers</Typography>
        </div>
        <List>
          {
            daemon.map(id => (
              <ListItem key={id} id={id} onClick={this.navigate(id)} onRemove={this.remove(id)} />
            ))
          }
        </List>
        <div>
          <TextField label={DAEMON} onChange={this.change} />
        </div>
        <div>
          <Button onClick={this.add}>Add server</Button>
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
    remove,
  }, dispatch)
)(Daemons);

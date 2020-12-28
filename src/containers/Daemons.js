
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect, } from 'react-redux';
import { push } from 'react-router-redux';
import {
  List,
  ListItem,
  ListItemText
} from '@rmwc/list';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { add, set } from '../actions';
import connectTo from '../websocket';
import { ROOT, PROJECT, DAEMON } from '../constants';

type Props = {
  daemon: [];
  connectTo: (string) => void;
  navigate: (string) => void;
  add: (string) => void;
  set: (string, {}) => void;
};

class Daemons extends Component<Props> {
  navigate = ({ id, project }) => () => {
    this.props.connectTo(id);
    this.props.navigate(project);
    this.props.add(ROOT, PROJECT, project);
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
            daemon.map(d => (
              <ListItem key={d.id} onClick={this.navigate(d)}>
                <ListItemText>{d.title || d.code || d.id}</ListItemText>
              </ListItem>
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
  ({ pool }) => ({
    daemon: ((pool.root || {}).daemon || []).map(id => ({ id, ...pool[id] })) // .filter(d => d.project)
  }),
  (dispatch) => bindActionCreators({
    navigate: (id) => push(`/project/${id}`),
    connectTo,
    add,
    set,
  }, dispatch)
)(Daemons);

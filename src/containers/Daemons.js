
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect, } from 'react-redux';
import { push } from 'react-router-redux';
import {
  List,
  ListItem,
  ListItemText
} from '@rmwc/list';
import { Typography } from '@rmwc/typography';
import { add } from '../actions';
import connectTo from '../webrtc';
import { ROOT, PROJECT } from '../constants';

type Props = {
  daemon: [];
  connectTo: (string) => void;
  navigate: (string) => void;
  add: (string) => void;
};

class Daemons extends Component<Props> {
  navigate = ({ id, project }) => () => {
    this.props.connectTo(id);
    this.props.navigate(project);
    this.props.add(ROOT, PROJECT, project);
  };

  render() {
    const { daemon } = this.props;
    return (
      <div>
        <Typography use="headline4">Servers</Typography>
        <List>
          {
            daemon.map(d => (
              <ListItem key={d.id} onClick={this.navigate(d)}>
                <ListItemText>{d.title || d.id}</ListItemText>
              </ListItem>
            ))
          }
        </List>
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
    add
  }, dispatch)
)(Daemons);

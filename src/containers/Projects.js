
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText
} from '@rmwc/list';
import { Button } from '@rmwc/button';
import { Typography } from '@rmwc/typography';
import { create } from '../actions';
import { ROOT, PROJECT, MODEL } from '../constants';

type Props = {
  project: [],
  createProject: () => void
};

class Projects extends Component<Props> {
  create = () => {
    const { createProject } = this.props;
    createProject();
  }

  render() {
    const { project } = this.props;
    return (
      <div>
        <Typography use="headline4">Projects</Typography>
        <List>
          {
            project.map(p => (
              <ListItem key={p.id} tag={Link} to={`/project/${p.id}/${MODEL}`}>
                <ListItemText>{p.title || p.id}</ListItemText>
              </ListItem>
            ))
          }
        </List>
        <Button onClick={this.create}>Create project</Button>
      </div>
    );
  }
}

export default connect(
  ({ pool }) => ({ project: ((pool.root || {}).project || []).map(id => ({ id, ...pool[id] })) }),
  (dispatch) => bindActionCreators({
    createProject: () => create(ROOT, PROJECT, PROJECT)
  }, dispatch)
)(Projects);

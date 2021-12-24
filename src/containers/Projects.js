
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import { Typography } from '@rmwc/typography';
import { List } from '@rmwc/list';
import { create } from '../actions';
import { ROOT, PROJECT, MODEL } from '../constants';
import ListItem from './ListItem';
import { push } from 'react-router-redux';

class Projects extends Component {
  create = () => {
    const { createProject } = this.props;
    createProject();
  }

  render() {
    const { project, navigate } = this.props;
    return (
      <div>
        <Typography use="headline4">Projects</Typography>
        <List>
          {
            project.map(id => (
              <ListItem key={id} id={id} onClick={() => navigate(id)} />
            ))
          }
        </List>
        <Button onClick={this.create}>Create project</Button>
      </div>
    );
  }
}

export default connect(
  ({ pool }) => pool.root || {},
  (dispatch) => bindActionCreators({
    createProject: () => create(ROOT, PROJECT, PROJECT),
    navigate: (id) => push(`/project/${id}/${MODEL}`)
  }, dispatch)
)(Projects);

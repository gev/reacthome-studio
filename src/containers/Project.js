
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from './Toolbar';
import Menu from './Menu';
import Details from './Details';
import Grid from './Grid';
import { MODEL, SCRIPT, TIMER } from '../constants';

type Props = {
  match: {},
  title: ?string,
  daemon: ?string
};

class Project extends Component<Props> {
  state = { menuOpen: false };

  componentWillReceiveProps() {
    this.closeMenu();
  }

  openMenu = () => {
    this.setState({ menuOpen: true });
  }

  closeMenu = () => {
    this.setState({ menuOpen: false });
  }

  render() {
    const {
      title, match: { params: { project, id, field } }, daemon
    } = this.props;
    const isModel = id === MODEL;
    const isScript = id === SCRIPT;
    const isTimer = id === TIMER;
    return (
      <div className="container">
        <Menu project={project} open={this.state.menuOpen} onClose={this.closeMenu} />
        <Toolbar project={project} id={id} title={title} openMenu={this.openMenu} />
        {
          isModel &&
            <Grid project={project} />
        }
        {
          isScript &&
            <Details project={project} daemon={daemon} id={project} field={SCRIPT} />
        }
        {
          isTimer &&
            <Details project={project} daemon={daemon} id={project} field={TIMER} />
        }
        {
          !(isModel || isScript || isTimer) &&
            <Details project={project} daemon={daemon} id={id || project} field={field} />
        }
      </div>
    );
  }
}

export default connect(({ pool }, { match: { params: { project } } }) =>
  pool[project] || {})(Project);

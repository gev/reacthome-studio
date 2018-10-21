
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toolbar from './Toolbar';
import Menu from './Menu';
import Details from './Details';
import Grid from './Grid';
import { mac, version, STUDIO, ACTION_DISCOVERY, DISCOVERY_INTERVAL, MODEL, SCRIPT, TIMER } from '../constants';
import { request } from '../actions';

type Props = {
  match: {},
  title: ?string,
  daemon: ?string,
  multicast: ?boolean,
  discovery: (daemon: string, multicast: boolean) => void
};

class Project extends Component<Props> {
  state = { menuOpen: false };

  componentWillMount() {
    const { daemon, multicast, discovery } = this.props;
    if (daemon) {
      this.timer = setInterval(() => {
        discovery(daemon, multicast);
      }, DISCOVERY_INTERVAL);
    }
  }

  componentWillReceiveProps({ daemon, multicast, discovery }) {
    this.closeMenu();
    if (daemon) {
      this.timer = setInterval(() => {
        discovery(daemon, multicast);
      }, DISCOVERY_INTERVAL);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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

const discovery = (multicast = true) => ({
  id: mac,
  type: ACTION_DISCOVERY,
  payload: { type: STUDIO, version, multicast }
});

export default connect(
  ({ pool }, { match: { params: { project } } }) => {
    const { title, code, daemon } = pool[project] || {};
    const { multicast } = pool[daemon] || {};
    return {
      title, code, daemon, multicast
    };
  },
  (dispatch) => bindActionCreators({
    discovery: (daemon, multicast) => request(daemon, discovery(multicast))
  }, dispatch)
)(Project);

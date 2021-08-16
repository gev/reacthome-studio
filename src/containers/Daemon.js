
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from './Toolbar';
import Details from './Details';
import Grid from './Grid';
import { MODEL, SCRIPT, TIMER, CLOCK, LOCATION, WEATHER, DRIVER, SCHEDULE, TERMINAL } from '../constants';
import Location from './Location';
import Weather from './Weather';
import Terminal from './Terminal';

type Props = {
  match: {},
  title: ?string,
  project: ?string
};

class Daemon extends Component<Props> {
  render() {
    const {
      title, match: { params: { id, daemon } }, project
    } = this.props;
    const isTerminal = id === TERMINAL;
    return (
      <div className="project">
        <div style={{ height: 64 }}>
          <Toolbar project={project} id={id} title={title} openMenu={this.openMenu} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="container">
            {
              isTerminal &&
                <Terminal daemon={daemon} project={project} />
            }
            {
              !(isTerminal) &&
                <Details daemon={daemon} project={project} id={id || daemon} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ pool }, { match: { params: { daemon } } }) =>
  pool[daemon] || {})(Daemon);

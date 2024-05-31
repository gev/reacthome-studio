
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CLOCK, DRIVER, LOCATION, MODEL, SCHEDULE, SCRIPT, TERMINAL, TIMER, WEATHER } from '../constants';
import Details from './Details';
import Grid from './Grid';
import Location from './Location';
import Terminal from './Terminal';
import Toolbar from './Toolbar';
import Weather from './Weather';

class Project extends Component {
  render() {
    const {
      title, match: { params: { project, id, field } }, daemon
    } = this.props;
    const isModel = id === MODEL;
    const isScript = id === SCRIPT;
    const isTimer = id === TIMER;
    const isSchedule = id === SCHEDULE;
    const isClock = id === CLOCK;
    const isLocation = id === LOCATION;
    const isWeather = id === WEATHER;
    const isDriver = id === DRIVER;
    const isTerminal = id === TERMINAL;
    return (
      <div className="project">
        <div style={{ height: 64 }}>
          <Toolbar project={project} id={id} title={title} openMenu={this.openMenu} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="container">
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
              isSchedule &&
              <Details project={project} daemon={daemon} id={project} field={SCHEDULE} />
            }
            {
              isClock &&
              <Details project={project} daemon={daemon} id={project} field={CLOCK} />
            }
            {
              isLocation &&
              <Location daemon={daemon} id={project} />
            }
            {
              isWeather &&
              <Weather daemon={daemon} id={project} />
            }
            {
              isDriver &&
              <Details project={project} daemon={daemon} id={project} field={DRIVER} />
            }
            {
              isTerminal &&
              <Terminal daemon={daemon} id={project} />
            }
            {
              !(isModel || isScript || isTimer || isSchedule || isClock || isLocation || isWeather || isDriver || isTerminal) &&
              <Details project={project} daemon={daemon} id={id || project} field={field} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { match: { params: { project } } }) => pool[project] || {}
)(Project);

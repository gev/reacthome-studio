
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from './Toolbar';
import Menu from './Menu';
import Details from './Details';
import Grid from './Grid';
import { MODEL, SCRIPT, TIMER, CLOCK, LOCATION, WEATHER, DRIVER, SCHEDULE } from '../constants';
import Location from './Location';
import Weather from './Weather';

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
    const isSchedule = id === SCHEDULE;
    const isClock = id === CLOCK;
    const isLocation = id === LOCATION;
    const isWeather = id === WEATHER;
    const isDriver = id === DRIVER;
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
          !(isModel || isScript || isTimer || isSchedule || isClock || isLocation || isWeather || isDriver) &&
            <Details project={project} daemon={daemon} id={id || project} field={field} />
        }
      </div>
    );
  }
}

export default connect(({ pool }, { match: { params: { project } } }) =>
  pool[project] || {})(Project);

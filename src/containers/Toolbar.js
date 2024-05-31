
import { Button, ButtonIcon } from '@rmwc/button';
import {
  Toolbar,
  ToolbarIcon,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
} from '@rmwc/toolbar';
import { remote } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goBack, push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { exportProject, sendProject } from '../actions';
import { CLOCK, DRIVER, LOCATION, MODEL, PROJECT, SCHEDULE, SCRIPT, TIMER, WEATHER } from '../constants';


class MyToolbar extends Component {
  exportProject = () => {
    remote.dialog.showOpenDialog(
      { buttonLabel: 'Export', properties: ['openDirectory', 'createDirectory'] },
      (folder) => {
        this.props.exportProject(folder[0]);
      }
    );
  };

  render() {
    const {
      project, title, back, details,
      model, script, timer, schedule, clock, location, weather, driver
    } = this.props;
    return (
      <Toolbar fixed style={{ backgroundColor: 'white' }}>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarIcon icon="arrow_back" theme="text-primary-on-background" onClick={back} />
            <ToolbarIcon icon="home" theme="text-primary-on-background" onClick={this.props.welcome} />
            <ToolbarTitle theme="text-primary-on-background" >{title || project}</ToolbarTitle>
            <ToolbarIcon icon="play_arrow" theme="text-primary-on-background" onClick={this.props.sendProject} />
            {/* <ToolbarIcon icon="file_upload" theme="text-primary-on-background" onClick={this.exportProject} /> */}
          </ToolbarSection>
          {project && (
            <div>
              <Button onClick={details}><ButtonIcon icon="star" />{PROJECT}</Button>
              <Button onClick={model}><ButtonIcon icon="apps" />{MODEL}</Button>
              <Button onClick={script}><ButtonIcon icon="web" />{SCRIPT}</Button>
              <Button onClick={timer}><ButtonIcon icon="timer" />{TIMER}</Button>
              <Button onClick={schedule}><ButtonIcon icon="event" />{SCHEDULE}</Button>
              <Button onClick={clock}><ButtonIcon icon="access_time" />{CLOCK}</Button>
              {/* <Button onClick={location}><ButtonIcon icon="location_on" />{LOCATION}</Button> */}
              <Button onClick={weather}><ButtonIcon icon="filter_drama" />{WEATHER}</Button>
              <Button onClick={driver}><ButtonIcon icon="extension" />{DRIVER}</Button>
            </div>
          )}
        </ToolbarRow>
      </Toolbar>
    );
  }
}

export default connect(
  (state, props) => props,
  (dispatch, { project }) => bindActionCreators({
    back: goBack,
    details: () => push(`/${PROJECT}/${project}`),
    model: () => push(`/${PROJECT}/${project}/${MODEL}`),
    script: () => push(`/${PROJECT}/${project}/${SCRIPT}`),
    timer: () => push(`/${PROJECT}/${project}/${TIMER}`),
    schedule: () => push(`/${PROJECT}/${project}/${SCHEDULE}`),
    clock: () => push(`/${PROJECT}/${project}/${CLOCK}`),
    location: () => push(`/${PROJECT}/${project}/${LOCATION}`),
    weather: () => push(`/${PROJECT}/${project}/${WEATHER}`),
    driver: () => push(`/${PROJECT}/${project}/${DRIVER}`),
    welcome: () => push('/'),
    sendProject: () => sendProject(project),
    exportProject: (folder) => exportProject(project, folder)
  }, dispatch)
)(MyToolbar);

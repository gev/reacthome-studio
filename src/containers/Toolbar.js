
import { remote } from 'electron';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { goBack, push } from 'react-router-redux';
import { connect } from 'react-redux';
import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle,
  ToolbarIcon,
  ToolbarSection,
  ToolbarFixedAdjust
} from '@rmwc/toolbar';
import { Button, ButtonIcon } from '@rmwc/button';
import { MODEL, PROJECT, SCRIPT, TIMER, CLOCK } from '../constants';
import { sendProject, exportProject } from '../actions';

type Props = {
  project: string,
  title: ?string,
  openMenu: () => {},
  back: () => void,
  details: () => void,
  model: () => void,
  script: () => void,
  timer: () => void,
  clock: () => void,
  sendProject: () => void,
  exportProject: (folder: string) => void
};

class MyToolbar extends Component<Props> {
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
      project, title, back, openMenu, details, model, script, timer, clock
    } = this.props;
    return [
      <Toolbar key="toolbar" fixed style={{ backgroundColor: 'white' }}>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarIcon icon="menu" theme="text-primary-on-background" onClick={openMenu} />
            <ToolbarIcon icon="arrow_back" theme="text-primary-on-background" onClick={back} />
            <ToolbarTitle theme="text-primary-on-background" >{title || project}</ToolbarTitle>
            <ToolbarIcon icon="play_arrow" theme="text-primary-on-background" onClick={this.props.sendProject} />
            <ToolbarIcon icon="file_upload" theme="text-primary-on-background" onClick={this.exportProject} />
          </ToolbarSection>
          <Button onClick={details}><ButtonIcon icon="star" />{PROJECT}</Button>
          <Button onClick={model}><ButtonIcon icon="apps" />{MODEL}</Button>
          <Button onClick={script}><ButtonIcon icon="web" />{SCRIPT}</Button>
          <Button onClick={timer}><ButtonIcon icon="timer" />{TIMER}</Button>
          <Button onClick={clock}><ButtonIcon icon="access_time" />{CLOCK}</Button>
        </ToolbarRow>
      </Toolbar>,
      <ToolbarFixedAdjust key="adjust" />
    ];
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
    clock: () => push(`/${PROJECT}/${project}/${CLOCK}`),
    sendProject: () => sendProject(project),
    exportProject: (folder) => exportProject(project, folder)
  }, dispatch)
)(MyToolbar);

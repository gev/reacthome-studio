
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
import { MODEL, PROJECT, SCRIPT, TIMER } from '../constants';
import { sendProject } from '../actions';

type Props = {
  project: string,
  title: ?string,
  openMenu: () => {},
  back: () => void,
  details: () => void,
  model: () => void,
  script: () => void,
  timer: () => void,
  send: () => void,
};

class MyToolbar extends Component<Props> {
  render() {
    const {
      project, title, back, openMenu, details, model, script, timer, send
    } = this.props;
    return [
      <Toolbar key="toolbar" fixed style={{ backgroundColor: 'white' }}>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarIcon icon="menu" theme="text-primary-on-background" onClick={openMenu} />
            <ToolbarIcon icon="arrow_back" theme="text-primary-on-background" onClick={back} />
            <ToolbarTitle theme="text-primary-on-background" >{title || project}</ToolbarTitle>
            <ToolbarIcon icon="play_arrow" theme="text-primary-on-background" onClick={send} />
          </ToolbarSection>
          <Button onClick={details}><ButtonIcon icon="star" />{PROJECT}</Button>
          <Button onClick={model}><ButtonIcon icon="apps" />{MODEL}</Button>
          <Button onClick={script}><ButtonIcon icon="web" />{SCRIPT}</Button>
          <Button onClick={timer}><ButtonIcon icon="timer" />{TIMER}</Button>
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
    send: () => sendProject(project),
  }, dispatch)
)(MyToolbar);


import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { goBack, push } from 'react-router-redux';
import { connect } from 'react-redux';
import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle,
  ToolbarIcon,
  ToolbarSection
} from 'rmwc/Toolbar';
import { Button, ButtonIcon } from 'rmwc/Button';

import { EQUIPMENT, INTERFACE, PROJECT } from '../constants';

type Props = {
  project: string,
  title: ?string,
  openMenu: () => {},
  back: () => void,
  details: () => void,
  equipment: () => void,
  iface: () => void
};

class MyToolbar extends Component<Props> {
  render() {
    const {
      project, title, back, openMenu, details, equipment, iface
    } = this.props;
    return (
      <Toolbar fixed theme="text-primary-on-light" style={{ backgroundColor: 'white' }}>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarIcon use="menu" onClick={openMenu} />
            <ToolbarIcon use="arrow_back" onClick={back} />
            <ToolbarTitle>{title || project}</ToolbarTitle>
          </ToolbarSection>
          <Button onClick={details}><ButtonIcon use="star" />{PROJECT}</Button>
          <Button onClick={equipment}><ButtonIcon use="apps" />{EQUIPMENT}</Button>
          <Button onClick={iface}><ButtonIcon use="web" />{INTERFACE}</Button>
        </ToolbarRow>
      </Toolbar>
    );
  }
}

export default connect(
  (state, props) => props,
  (dispatch, { project }) => bindActionCreators({
    back: () => goBack(),
    details: () => push(`/project/${project}`),
    equipment: () => push(`/project/${project}/${EQUIPMENT}`),
    iface: () => push(`/project/${project}/${INTERFACE}`)
  }, dispatch)
)(MyToolbar);

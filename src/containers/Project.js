
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToolbarFixedAdjust } from 'rmwc/Toolbar';
import Toolbar from './Toolbar';
import Menu from './Menu';
import Details from './Details';
import Grid from './Grid';
import { EQUIPMENT, INTERFACE } from '../constants';

type Props = {
  match: {},
  title: ?string
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
    const { title, match: { params: { project, id, field } } } = this.props;
    const isEquipment = id === EQUIPMENT;
    const isInterface = id === INTERFACE;
    return (
      <div className="container">
        <Toolbar project={project} id={id} title={title} openMenu={this.openMenu} />
        <ToolbarFixedAdjust />
        <Menu project={project} open={this.state.menuOpen} onClose={this.closeMenu} />
        {
          isEquipment &&
            <Grid project={project} />
        }
        {
          isInterface &&
            <div />
        }
        {
          !(isEquipment || isInterface) &&
            <Details project={project} id={id || project} field={field} />
        }
      </div>
    );
  }
}

export default connect(({ pool }, { match: { params: { project } } }) =>
  ({ title: (pool[project] || {}).title }))(Project);

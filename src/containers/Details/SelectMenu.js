
import React, { Component } from 'react';
import SimpleMenu from './SimpleMenu';

export default class extends Component{
  state = { }
  openMenu = () => {
    this.setState({ isMenuOpen: true });
  }
  closeMenu = () => {
    this.setState({ isMenuOpen: false });
  }
  render() {
    return this.state.isMenuOpen ? (
      <SimpleMenu
        {...this.props}
        onClose={this.closeMenu}
      />
    ) : (
      <div onClick={this.openMenu}>
        {this.props.handle}
      </div>
    );
  }
};

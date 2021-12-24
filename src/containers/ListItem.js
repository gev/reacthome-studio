import React, { Component } from 'react';
import { connect, } from 'react-redux';
import { ListItem, ListItemText } from '@rmwc/list';

class Daemons extends Component {
  render() {
    const { id, code, title, onClick } = this.props;
    return (
      <ListItem onClick={onClick}>
        <ListItemText>{title || code || id}</ListItemText>
      </ListItem>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {}
)(Daemons);

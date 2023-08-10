import React, { Component } from 'react';
import { connect, } from 'react-redux';
import { Link } from 'react-router-dom';

import { ListItem, ListItemText, ListItemGraphic } from '@rmwc/list';
import RemoveButton from '../components/RemoveButton';

class Daemons extends Component {
  render() {
    const { id, code, title, onClick, onRemove } = this.props;
    return (
      <ListItem>
        <ListItemGraphic icon={<RemoveButton title={title || code || id} icon="remove" onClick={onRemove} />} />
        <ListItemText onClick={onClick}>{title || code || id}</ListItemText>
      </ListItem>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {}
)(Daemons);

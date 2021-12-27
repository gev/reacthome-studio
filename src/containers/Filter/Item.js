
import React, { Component } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText
} from '@rmwc/list';

export default class extends Component {
  select = () => {
    const { id, onSelect } = this.props;
    if (onSelect) onSelect(id);
  };

  render() {
    const {
      code, type, title
    } = this.props;
    return (
      <ListItem onMouseDown={this.select}>
        <ListItemText>
          <ListItemPrimaryText>{code || title}</ListItemPrimaryText>
          <ListItemSecondaryText>{type}</ListItemSecondaryText>
        </ListItemText>
      </ListItem>
    );
  }
}

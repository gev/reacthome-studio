
import React, { Component } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryText
} from 'rmwc/List';

type Props = {
  id: string,
  code: ?string,
  type: ?string,
  title: ?string,
  onSelect: ?(id: string) => void
}

export default class extends Component<Props> {
  select = () => {
    const { id, onSelect } = this.props;
    if (onSelect) onSelect(id);
  };

  render() {
    const {
      id, code, type, title
    } = this.props;
    return (
      <ListItem onMouseDown={this.select}>
        <ListItemText>{title || code || id}</ListItemText>
        <ListItemSecondaryText>{type}</ListItemSecondaryText>
      </ListItem>
    );
  }
}

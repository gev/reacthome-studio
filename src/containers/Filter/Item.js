
import React, { Component } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText
} from '@rmwc/list';

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
        <ListItemText>
          <ListItemPrimaryText>{code || title}</ListItemPrimaryText>
          <ListItemSecondaryText>{type}</ListItemSecondaryText>
        </ListItemText>
      </ListItem>
    );
  }
}

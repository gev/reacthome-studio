
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, DrawerContent } from '@rmwc/drawer';
import {
  ListItem,
  ListItemGraphic,
  ListItemText,
} from '@rmwc/list';

type Props = {
  project: string,
  open: ?boolean,
  onClose: () => void
};

export default class extends Component<Props> {
  render() {
    const { project, open, onClose } = this.props;
    return (
      <Drawer modal open={open} onClose={onClose}>
        <DrawerContent>
          <ListItem tag={Link} to="/">
            <ListItemGraphic icon="home" />
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem tag={Link} to={`/project/${project}`}>
            <ListItemText>Project</ListItemText>
          </ListItem>
        </DrawerContent>
      </Drawer>
    );
  }
}

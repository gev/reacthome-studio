
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, DrawerContent } from 'rmwc/Drawer';
import {
  ListItem,
  ListItemGraphic,
  ListItemText,
} from 'rmwc/List';

type Props = {
  project: string,
  open: ?boolean,
  onClose: () => void
};

export default class extends Component<Props> {
  render() {
    const { project, open, onClose } = this.props;
    return (
      <Drawer temporary open={open} onClose={onClose}>
        <DrawerContent>
          <ListItem tag={Link} to="/">
            <ListItemGraphic>home</ListItemGraphic>
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


import {
  Card,
  CardAction,
  CardActionButtons,
  CardActionIcons,
  CardActions
} from '@rmwc/card';
import { Tab, TabBar } from '@rmwc/tabs';
import { TextField } from '@rmwc/textfield';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import { Button, MenuItem, SimpleMenu } from 'rmwc';
import { makeBind, modify, remove } from '../../../actions';
import CardActionRemove from '../../../components/CardActionRemove';
import { CODE, DALI_GROUP, DALI_LIGHT, PORT, TITLE } from '../../../constants';
import { DaliGroup, DaliLight } from './DaliChannel';
import SelectModbus from './SelectModbus';

class Container extends Component {
  state = { tabIndex: 0 };

  bind = (bind) => {
    this.props.change({ bind });
  }

  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }

  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  setPort = (port) => () => {
    this.props.change({ port });
  }

  render() {
    const { tabIndex } = this.state;
    const {
      id, project, title, code, bind,
      details, removeField, port = 1
    } = this.props;
    const lights = [];
    for (let i = 0; i < 64; i += 1) {
      lights.push(<DaliLight {...this.props} key={`${id}/${DALI_LIGHT}/${i}`} index={i} />);
    }
    const groups = [];
    for (let i = 0; i < 16; i += 1) {
      groups.push(<DaliGroup {...this.props} key={`${id}/${DALI_GROUP}/${i}`} index={i} />);
    }
    return (
      <Card>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <div className="paper">
          <SelectModbus id={bind} root={project} onSelect={this.bind} />
        </div>
        <div className="paper">
          <SimpleMenu handle={<Button>{PORT} {port}</Button>}>
            <MenuItem onClick={this.setPort(1)}>port 1</MenuItem>
            <MenuItem onClick={this.setPort(2)}>port 2</MenuItem>
          </SimpleMenu>
        </div>
        <TabBar
          activeTabIndex={tabIndex}
          onActivate={this.select}
        >
          <Tab>Lights</Tab>
          <Tab>Groups</Tab>
        </TabBar>
        <div key={`${id}/tab/${tabIndex}`} tabIndex={tabIndex} style={{ maxWidth: '100%', maxHeight: 600, overflowY: 'auto' }}>
          <table>
            <tbody>
              {
                tabIndex === 0 && lights
              }
              {
                tabIndex === 1 && groups
              }
            </tbody>
          </table>
        </div>
        <CardActions>
          <CardActionButtons>
            <CardAction onClick={details}>Details</CardAction>
          </CardActionButtons>
          <CardActionIcons>
            <CardActionRemove remove={removeField} />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, {
    project, parent, id, field, multiple
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    details: () => push(`/project/${project}/${id}`),
    change: (payload) => modify(id, payload),
    makeBind
  }, dispatch)
)(Container);

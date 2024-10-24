
import {
  Card,
  CardActionIcons,
  CardActions
} from '@rmwc/card';
import { Tab, TabBar } from '@rmwc/tabs';
import { TextField } from '@rmwc/textfield';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeBind, modify, remove } from '../../../actions';
import CardActionRemove from '../../../components/CardActionRemove';
import { ACTION_SET, CODE, DALI_GROUP, DALI_LIGHT, TITLE } from '../../../constants';
import { send } from '../../../websocket/peer';
import { DaliGroup, DaliLight } from './DaliChannel';
import SelectModbus from './SelectModbus';

class Container extends Component {
  state = { tabIndex: 0 };

  bind = (bind) => {
    const { id } = this.props;
    this.props.makeBind(id, bind);
  }

  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }

  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  setNumber = (name, max) => ({ target: { value } }) => {
    const { daemon, id } = this.props;
    let number = parseInt(value, 10);
    if (number < 0) number = 0;
    if (number > max) number = max;
    send(daemon, { type: ACTION_SET, id, payload: { [name]: number } });
  }

  render() {
    const { tabIndex } = this.state;
    const {
      id, project, title, code, bind,
      removeField, numberLights = 0, numberGroups = 0
    } = this.props;
    const lights = [];
    for (let i = 0; i < numberLights; i += 1) {
      lights.push(<DaliLight {...this.props} key={`${id}/${DALI_LIGHT}/${i}`} index={i} />);
    }
    const groups = [];
    for (let i = 0; i < numberGroups; i += 1) {
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
        <table>
          <tbody>
            <tr>
              <td className="paper">
                <TextField value={numberLights} label="Lights" type="number" onChange={this.setNumber('numberLights', 64)} />
              </td>
              <td className="paper">
                <TextField value={numberGroups} label="Groups" type="number" onChange={this.setNumber('numberGroups', 16)} />
              </td>
            </tr>
          </tbody>
        </table>
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
    parent, id, field, multiple
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    change: (payload) => modify(id, payload),
    makeBind
  }, dispatch)
)(Container);

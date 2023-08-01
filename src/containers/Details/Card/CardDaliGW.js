
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons,
  CardActionButtons
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { TabBar, Tab } from '@rmwc/tabs';

import { TITLE, CODE, DALI_GROUP, DALI_LIGHT } from '../../../constants';
import { remove, modify } from '../../../actions';
import { DaliGroup, DaliLight } from './DaliChannel';

class Container extends Component {
  state = { tabIndex: 0 };

  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }

  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  changeInt = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: parseInt(value, 10) });
  }

  render() {
    const { tabIndex } = this.state;
    const {
      id, title, code, host, port, address,
      details, removeField
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
          <TextField id="host" value={host} label="host" type="text" onChange={this.change} />
          <TextField id="port" value={port} label="port" type="number" onChange={this.changeInt} />
          <TextField id="address" value={address} label="address" type="number" onChange={this.changeInt} />
        </div>
        <TabBar
          activeTabIndex={tabIndex}
          onActivate={this.select}
        >
          <Tab>Lights</Tab>
          <Tab>Groups</Tab>
        </TabBar>
        <div key={tabIndex} style={{ maxWidth: '100%', maxHeight: 600, overflowY: 'auto' }}>
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
            <CardAction icon="remove" onClick={removeField} />
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
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);

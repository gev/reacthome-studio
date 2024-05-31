
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
import { remove, modify, makeBind } from '../../../actions';
import { DaliGroup, DaliLight } from './DaliChannel';
import SelectModbus from './SelectModbus';
import CardActionRemove from '../../../components/CardActionRemove';

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

  render() {
    const { tabIndex } = this.state;
    const {
      id, project, title, code, bind,
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
          <SelectModbus id={bind} root={project} onSelect={this.bind} />
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

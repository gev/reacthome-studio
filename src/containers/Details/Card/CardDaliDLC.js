
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
import { CODE, TITLE } from '../../../constants';
import DaliDLCPort from './DaliDLCPort';
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

  render() {
    const { tabIndex } = this.state;
    const { id, project, title, code, bind, removeField } = this.props;
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
          <Tab>Port 1</Tab>
          <Tab>Port 2</Tab>
        </TabBar>
        <DaliDLCPort {...this.props} port={tabIndex + 1} />
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

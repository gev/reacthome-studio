
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
import { create, modify, remove } from '../../../actions';
import CardActionRemove from '../../../components/CardActionRemove';
import { CODE, MODE, MODES } from '../../../constants';
import CardSmartTopButtons from './CardSmartTopButtons';
import CardSmartTopClimate from './CardSmartTopClimate';
import CardSmartTopModes from './CardSmartTopModes';


class Container extends Component {
  state = { index: 0 }

  select = ({ detail: { index } }) => {
    this.setState({ index });
  }

  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  render() {
    const { index } = this.state;
    const { code, removeField } = this.props;
    return (
      <Card>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <TabBar activeTabIndex={index} onActivate={this.select}>
          <Tab>Climate</Tab>
          <Tab>Buttons</Tab>
          <Tab>Modes</Tab>
        </TabBar>
        {
          index === 0 && (
            <CardSmartTopClimate {...this.props} />
          )
        }
        {
          index === 1 && (
            <CardSmartTopButtons {...this.props} />
          )
        }
        {
          index === 2 && (
            <CardSmartTopModes {...this.props} />
          )
        }
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
  (dispatch, { parent, id, field, multiple }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    change: (payload) => modify(id, payload),
    addMode: () => create(id, MODES, MODE),
    removeMode: (mode) => remove(id, MODES, mode)
  }, dispatch)
)(Container);

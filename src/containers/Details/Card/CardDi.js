
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';
import { TabBar, Tab } from '@rmwc/tabs';
import { TextField } from '@rmwc/textfield';
import { remove, modify, makeBind } from '../../../actions';
import { CODE, DI } from '../../../constants';
import Di from './CardDiBind';
import SelectDi from './SelectDi';

class Container extends Component {
  state = { di: 0 }

  selectDi = ({ detail: { index } }) => {
    this.setState({ di: index });
  }

  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  select = (bind) => {
    const { id } = this.props;
    this.props.makeBind(id, bind);
  }
  
  render() {
    const {
      code, project, bind, removeField
    } = this.props;
    return (
      <Card>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <div className="paper">
          <SelectDi id={bind} root={project} onSelect={this.select} />
        </div>
        <TabBar
          activeTabIndex={this.state.di}
          onActivate={this.selectDi}
        >
          <Tab>1</Tab>
          <Tab>2</Tab>
          <Tab>3</Tab>
          <Tab>4</Tab>
        </TabBar>
        <div className="paper">
          <Di id={`${id}/${DI}/${this.state.di + 1}`} project={project} />
        </div>
        <CardActions>
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
    change: (payload) => modify(id, payload),
    makeBind
  }, dispatch)
)(Container);
